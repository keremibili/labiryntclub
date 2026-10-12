import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowDown,
  ArrowUp,
  Home,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Plus,
  Save,
  Trash2,
  Type,
  Wine,
} from 'lucide-react'
import { languages } from '../../i18n/languages'
import {
  fetchContent,
  getAdminToken,
  saveContent,
  setAdminToken,
  uploadImage,
} from '../../lib/api'
import { displayName, sameName } from '../../lib/localized'
import { patchLocalized } from '../../lib/localizeContent'
import type { Lang, MenuCategory, MenuItem, SiteContent } from '../../types/content'
import { createDefaultContent } from '../../data/defaultContent'
import './admin.css'

type Section = 'home' | 'texts' | `cat:${number}`

function moveItem<T>(arr: T[], from: number, to: number) {
  if (to < 0 || to >= arr.length) return arr
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export default function AdminPanel() {
  const navigate = useNavigate()
  const [content, setContent] = useState<SiteContent>(() => createDefaultContent())
  const [section, setSection] = useState<Section>('home')
  const [langTab, setLangTab] = useState<Lang>('pl')
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/admin/login')
      return
    }
    fetchContent()
      .then((data) => setContent(data))
      .finally(() => setLoading(false))
  }, [navigate])

  const catIndex = section.startsWith('cat:') ? Number(section.slice(4)) : -1
  const category = catIndex >= 0 ? content.categories[catIndex] : null

  const updateText = (key: keyof SiteContent['texts'], value: string) => {
    setContent((prev) => ({
      ...prev,
      texts: { ...prev.texts, [key]: { ...prev.texts[key], [langTab]: value } },
    }))
  }

  const updateCategory = (index: number, patch: Partial<MenuCategory>) => {
    setContent((prev) => {
      const categories = [...prev.categories]
      categories[index] = { ...categories[index], ...patch }
      return { ...prev, categories }
    })
  }

  const updateItem = (catIdx: number, itemIdx: number, patch: Partial<MenuItem>) => {
    setContent((prev) => {
      const categories = [...prev.categories]
      const items = [...categories[catIdx].items]
      items[itemIdx] = { ...items[itemIdx], ...patch }
      categories[catIdx] = { ...categories[catIdx], items }
      return { ...prev, categories }
    })
  }

  const onUpload = async (
    file: File | undefined,
    folder: string,
    apply: (url: string) => void,
  ) => {
    if (!file) return
    setStatus('Yükleniyor...')
    try {
      apply(await uploadImage(file, folder))
      setStatus('Fotoğraf yüklendi')
    } catch {
      setStatus('Yükleme başarısız')
    }
  }

  const onSave = async () => {
    setSaving(true)
    setStatus('Kaydediliyor...')
    try {
      const saved = await saveContent(content)
      setContent(saved)
      setStatus('Kaydedildi')
    } catch {
      setStatus('Kayıt başarısız — tekrar giriş yapın')
      setAdminToken(null)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin">
        <p className="admin-muted">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="admin">
      <aside className="admin-nav">
        <div className="admin-nav__brand">
          <img src="/images/logo.png" alt="" width={40} height={40} />
          <div>
            <strong>Labirynt</strong>
            <span>Admin</span>
          </div>
        </div>

        <nav>
          <p className="admin-nav__label">Site</p>
          <button
            type="button"
            className={section === 'home' ? 'active' : ''}
            onClick={() => setSection('home')}
          >
            <Home size={18} /> Anasayfa
          </button>
          <button
            type="button"
            className={section === 'texts' ? 'active' : ''}
            onClick={() => setSection('texts')}
          >
            <Type size={18} /> Yazılar
          </button>

          <p className="admin-nav__label">Menü</p>
          {content.categories.map((cat, index) => (
            <button
              key={cat.id}
              type="button"
              className={section === `cat:${index}` ? 'active' : ''}
              onClick={() => setSection(`cat:${index}`)}
            >
              <Wine size={18} />
              <span className="admin-nav__num">{index + 1}</span>
              {displayName(cat.title)}
            </button>
          ))}
          <button
            type="button"
            className="admin-nav__add"
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                categories: [
                  ...prev.categories,
                  {
                    id: `cat-${Date.now()}`,
                    title: sameName('Yeni kategori'),
                    image: '/images/cat-spirits.jpg',
                    items: [],
                  },
                ],
              }))
              setSection(`cat:${content.categories.length}`)
            }}
          >
            <Plus size={18} /> Kategori ekle
          </button>
        </nav>

        <div className="admin-nav__foot">
          <Link to="/" target="_blank">
            <ExternalLink size={16} /> Siteyi aç
          </Link>
          <button
            type="button"
            onClick={() => {
              setAdminToken(null)
              navigate('/admin/login')
            }}
          >
            <LogOut size={16} /> Çıkış
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-bar">
          <div>
            <h1>
              {section === 'home' && 'Anasayfa'}
              {section === 'texts' && 'Yazılar'}
              {category && displayName(category.title)}
            </h1>
            {status ? <p className="admin-status">{status}</p> : null}
          </div>
          <button type="button" className="btn-save" onClick={onSave} disabled={saving}>
            <Save size={18} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </header>

        {section === 'home' && (
          <section className="admin-panel">
            <div className="admin-cards">
              <label className="photo-card">
                <span>
                  <ImageIcon size={16} /> Hero fotoğraf
                </span>
                <img src={content.heroImage} alt="" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    onUpload(e.target.files?.[0], 'hero', (url) =>
                      setContent((prev) => ({ ...prev, heroImage: url })),
                    )
                  }
                />
              </label>
              <label className="photo-card photo-card--logo">
                <span>
                  <ImageIcon size={16} /> Logo
                </span>
                <img src={content.logoImage} alt="" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    onUpload(e.target.files?.[0], 'logo', (url) =>
                      setContent((prev) => ({ ...prev, logoImage: url })),
                    )
                  }
                />
              </label>
            </div>
          </section>
        )}

        {section === 'texts' && (
          <section className="admin-panel">
            <p className="admin-hint">
              Site yazıları ve menü isimleri seçili dile göre kaydedilir. Dil sekmesini değiştirerek
              her dil için ayrı metin girebilirsin.
            </p>
            <div className="lang-row">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={langTab === l.code ? 'active' : ''}
                  onClick={() => setLangTab(l.code)}
                >
                  <img src={l.flag} alt="" width={18} height={12} />
                  {l.label}
                </button>
              ))}
            </div>
            <div className="form-stack">
              {(
                [
                  ['tagline', 'Üst başlık'],
                  ['subtitle', 'Alt yazı'],
                  ['cta', 'Buton yazısı'],
                  ['menuTitle', 'Menü başlığı'],
                  ['currencyNote', 'Fiyat notu'],
                  ['location', 'Konum'],
                  ['footer', 'Footer'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="field">
                  {label}
                  <input
                    value={content.texts[key][langTab]}
                    onChange={(e) => updateText(key, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>
        )}

        {category && catIndex >= 0 && (
          <section className="admin-panel">
            <div className="toolbar">
              <button
                type="button"
                onClick={() => {
                  setContent((prev) => ({
                    ...prev,
                    categories: moveItem(prev.categories, catIndex, catIndex - 1),
                  }))
                  if (catIndex > 0) setSection(`cat:${catIndex - 1}`)
                }}
              >
                <ArrowUp size={16} /> Yukarı
              </button>
              <button
                type="button"
                onClick={() => {
                  setContent((prev) => ({
                    ...prev,
                    categories: moveItem(prev.categories, catIndex, catIndex + 1),
                  }))
                  if (catIndex < content.categories.length - 1) {
                    setSection(`cat:${catIndex + 1}`)
                  }
                }}
              >
                <ArrowDown size={16} /> Aşağı
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  if (!confirm('Kategoriyi sil?')) return
                  setContent((prev) => ({
                    ...prev,
                    categories: prev.categories.filter((_, i) => i !== catIndex),
                  }))
                  setSection('home')
                }}
              >
                <Trash2 size={16} /> Sil
              </button>
            </div>

            <label className="photo-card">
              <span>
                <ImageIcon size={16} /> Kategori fotoğrafı
              </span>
              <img src={category.image} alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  onUpload(e.target.files?.[0], 'category', (url) =>
                    updateCategory(catIndex, { image: url }),
                  )
                }
              />
            </label>

            <div className="lang-row">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={langTab === l.code ? 'active' : ''}
                  onClick={() => setLangTab(l.code)}
                >
                  <img src={l.flag} alt="" width={18} height={12} />
                  {l.label}
                </button>
              ))}
            </div>

            <label className="field">
              Kategori adı ({langTab.toUpperCase()})
              <input
                value={category.title[langTab] || displayName(category.title)}
                onChange={(e) =>
                  updateCategory(catIndex, {
                    title: patchLocalized(category.title, langTab, e.target.value),
                  })
                }
                placeholder="Örn. Gin"
              />
              <small className="field-note">Bu alan yalnızca seçili dile yazılır.</small>
            </label>

            <div className="list-head">
              <h2>Ürünler</h2>
              <button
                type="button"
                className="btn-dark"
                onClick={() => {
                  const item: MenuItem = {
                    id: `item-${Date.now()}`,
                    name: sameName('Yeni ürün'),
                    prices: [{ amount: 0 }],
                    image: '',
                  }
                  updateCategory(catIndex, { items: [...category.items, item] })
                }}
              >
                <Plus size={16} /> Ürün ekle
              </button>
            </div>

            <div className="product-list">
              {category.items.map((item, index) => (
                <article key={item.id} className="product">
                  <div className="product__top">
                    <strong>
                      {index + 1}. {displayName(item.name) || 'Ürün'}
                    </strong>
                    <div className="toolbar">
                      <button
                        type="button"
                        onClick={() =>
                          updateCategory(catIndex, {
                            items: moveItem(category.items, index, index - 1),
                          })
                        }
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateCategory(catIndex, {
                            items: moveItem(category.items, index, index + 1),
                          })
                        }
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => {
                          if (!confirm('Ürünü sil?')) return
                          updateCategory(catIndex, {
                            items: category.items.filter((_, i) => i !== index),
                          })
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="product__body">
                    <label className="photo-card photo-card--small">
                      <span>Foto</span>
                      {item.image ? (
                        <img src={item.image} alt="" />
                      ) : (
                        <div className="photo-empty">+</div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          onUpload(e.target.files?.[0], 'item', (url) =>
                            updateItem(catIndex, index, { image: url }),
                          )
                        }
                      />
                    </label>

                    <div className="form-stack grow">
                      <label className="field">
                        Ürün adı ({langTab.toUpperCase()})
                        <input
                          value={item.name[langTab] || displayName(item.name)}
                          onChange={(e) =>
                            updateItem(catIndex, index, {
                              name: patchLocalized(item.name, langTab, e.target.value),
                            })
                          }
                          placeholder="Örn. Absolut"
                        />
                        <small className="field-note">
                          Marka isimleri aynı kalabilir; açıklamalı ürünlerde her dili ayrı yaz.
                        </small>
                      </label>
                      <label className="field">
                        Açıklama / içerik ({langTab.toUpperCase()})
                        <textarea
                          rows={2}
                          value={item.description?.[langTab] || ''}
                          onChange={(e) =>
                            updateItem(catIndex, index, {
                              description: patchLocalized(
                                item.description || {
                                  pl: '',
                                  en: '',
                                  ru: '',
                                  es: '',
                                  uk: '',
                                },
                                langTab,
                                e.target.value,
                              ),
                            })
                          }
                          placeholder="İçindekiler · tat profili (ekşi, tatlı, sert…)"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="prices">
                    {item.prices.map((price, pIndex) => (
                      <div key={pIndex} className="price-line">
                        <label className="field">
                          Fiyat (zł)
                          <input
                            type="number"
                            step="0.01"
                            value={price.amount}
                            onChange={(e) => {
                              const prices = [...item.prices]
                              prices[pIndex] = {
                                ...prices[pIndex],
                                amount: Number(e.target.value),
                              }
                              updateItem(catIndex, index, { prices })
                            }}
                          />
                        </label>
                        <label className="field">
                          Ölçü
                          <input
                            value={price.size || ''}
                            placeholder="0.25 l"
                            onChange={(e) => {
                              const prices = [...item.prices]
                              prices[pIndex] = {
                                ...prices[pIndex],
                                size: e.target.value || undefined,
                              }
                              updateItem(catIndex, index, { prices })
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(catIndex, index, {
                              prices: item.prices.filter((_, i) => i !== pIndex),
                            })
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateItem(catIndex, index, {
                          prices: [...item.prices, { amount: 0 }],
                        })
                      }
                    >
                      <Plus size={16} /> Fiyat
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
