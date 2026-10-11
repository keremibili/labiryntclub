import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { languages } from '../../i18n/languages'
import {
  fetchContent,
  getAdminToken,
  saveContent,
  setAdminToken,
  uploadImage,
} from '../../lib/api'
import type { Lang, Localized, MenuCategory, MenuItem, SiteContent } from '../../types/content'
import { createDefaultContent } from '../../data/defaultContent'
import './admin.css'

const emptyLocalized = (): Localized => ({ pl: '', en: '', ru: '', es: '', uk: '' })

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
  const [langTab, setLangTab] = useState<Lang>('pl')
  const [activeCat, setActiveCat] = useState(0)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/admin/login')
      return
    }
    fetchContent()
      .then((data) => {
        setContent(data)
        setActiveCat(0)
      })
      .finally(() => setLoading(false))
  }, [navigate])

  const category = content.categories[activeCat]

  const textFields = useMemo(
    () =>
      [
        ['tagline', 'Üst başlık'],
        ['subtitle', 'Alt yazı'],
        ['cta', 'Buton'],
        ['menuTitle', 'Menü başlığı'],
        ['currencyNote', 'Fiyat notu'],
        ['location', 'Konum'],
        ['footer', 'Footer'],
      ] as const,
    [],
  )

  const updateText = (key: keyof SiteContent['texts'], value: string) => {
    setContent((prev) => ({
      ...prev,
      texts: {
        ...prev.texts,
        [key]: { ...prev.texts[key], [langTab]: value },
      },
    }))
  }

  const updateCategory = (patch: Partial<MenuCategory>) => {
    setContent((prev) => {
      const categories = [...prev.categories]
      categories[activeCat] = { ...categories[activeCat], ...patch }
      return { ...prev, categories }
    })
  }

  const updateItem = (index: number, patch: Partial<MenuItem>) => {
    setContent((prev) => {
      const categories = [...prev.categories]
      const items = [...categories[activeCat].items]
      items[index] = { ...items[index], ...patch }
      categories[activeCat] = { ...categories[activeCat], items }
      return { ...prev, categories }
    })
  }

  const onUpload = async (
    file: File | undefined,
    folder: string,
    apply: (url: string) => void,
  ) => {
    if (!file) return
    setStatus('Fotoğraf yükleniyor...')
    try {
      const url = await uploadImage(file, folder)
      apply(url)
      setStatus('Fotoğraf yüklendi')
    } catch {
      setStatus('Fotoğraf yüklenemedi')
    }
  }

  const onSave = async () => {
    setSaving(true)
    setStatus('Kaydediliyor...')
    try {
      const saved = await saveContent(content)
      setContent(saved)
      setStatus(`Kaydedildi · ${new Date(saved.updatedAt).toLocaleString()}`)
    } catch {
      setStatus('Kayıt başarısız — tekrar giriş yapmayı deneyin')
      setAdminToken(null)
    } finally {
      setSaving(false)
    }
  }

  const logout = () => {
    setAdminToken(null)
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="admin-shell">
        <p className="admin-loading">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <h1>Labirynt Admin</h1>
          <p>Değişiklikler kayıttan sonra sitede anında görünür</p>
        </div>
        <div className="admin-top__actions">
          <Link to="/" target="_blank">
            Siteyi aç
          </Link>
          <button type="button" className="admin-primary" onClick={onSave} disabled={saving}>
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button type="button" onClick={logout}>
            Çıkış
          </button>
        </div>
      </header>

      {status ? <p className="admin-status">{status}</p> : null}

      <section className="admin-section">
        <h2>Anasayfa görselleri</h2>
        <div className="admin-grid-2">
          <label className="admin-upload">
            Hero arka plan
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
          <label className="admin-upload">
            Logo
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

      <section className="admin-section">
        <div className="admin-row">
          <h2>Yazılar</h2>
          <div className="admin-lang-tabs">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                className={langTab === l.code ? 'active' : ''}
                onClick={() => setLangTab(l.code)}
              >
                <img src={l.flag} alt="" width={16} height={11} /> {l.label}
              </button>
            ))}
          </div>
        </div>
        <div className="admin-fields">
          {textFields.map(([key, label]) => (
            <label key={key}>
              {label} ({langTab.toUpperCase()})
              <input
                value={content.texts[key][langTab]}
                onChange={(e) => updateText(key, e.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-row">
          <h2>Menü kategorileri</h2>
          <button
            type="button"
            onClick={() => {
              const id = `cat-${Date.now()}`
              setContent((prev) => ({
                ...prev,
                categories: [
                  ...prev.categories,
                  {
                    id,
                    title: { ...emptyLocalized(), pl: 'Yeni kategori' },
                    image: '/images/cat-spirits.jpg',
                    items: [],
                  },
                ],
              }))
              setActiveCat(content.categories.length)
            }}
          >
            + Kategori
          </button>
        </div>

        <div className="admin-cat-tabs">
          {content.categories.map((cat, index) => (
            <button
              key={cat.id}
              type="button"
              className={activeCat === index ? 'active' : ''}
              onClick={() => setActiveCat(index)}
            >
              {cat.title.pl || cat.title.en || cat.id}
            </button>
          ))}
        </div>

        {category ? (
          <div className="admin-cat-editor">
            <div className="admin-row wrap">
              <button
                type="button"
                onClick={() => {
                  setContent((prev) => ({
                    ...prev,
                    categories: moveItem(prev.categories, activeCat, activeCat - 1),
                  }))
                  setActiveCat((i) => Math.max(0, i - 1))
                }}
              >
                ↑ Yukarı
              </button>
              <button
                type="button"
                onClick={() => {
                  setContent((prev) => ({
                    ...prev,
                    categories: moveItem(prev.categories, activeCat, activeCat + 1),
                  }))
                  setActiveCat((i) => Math.min(content.categories.length - 1, i + 1))
                }}
              >
                ↓ Aşağı
              </button>
              <button
                type="button"
                className="admin-danger"
                onClick={() => {
                  if (!confirm('Bu kategoriyi sil?')) return
                  setContent((prev) => ({
                    ...prev,
                    categories: prev.categories.filter((_, i) => i !== activeCat),
                  }))
                  setActiveCat(0)
                }}
              >
                Kategoriyi sil
              </button>
            </div>

            <label className="admin-upload admin-upload--wide">
              Kategori fotoğrafı
              <img src={category.image} alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  onUpload(e.target.files?.[0], 'category', (url) => updateCategory({ image: url }))
                }
              />
            </label>

            <div className="admin-fields">
              {languages.map((l) => (
                <label key={l.code}>
                  Kategori adı ({l.label})
                  <input
                    value={category.title[l.code]}
                    onChange={(e) =>
                      updateCategory({
                        title: { ...category.title, [l.code]: e.target.value },
                      })
                    }
                  />
                </label>
              ))}
            </div>

            <div className="admin-row">
              <h3>İçecekler / ürünler</h3>
              <button
                type="button"
                onClick={() => {
                  const item: MenuItem = {
                    id: `item-${Date.now()}`,
                    name: { ...emptyLocalized(), pl: 'Yeni ürün' },
                    prices: [{ amount: 0 }],
                    image: '',
                  }
                  updateCategory({ items: [...category.items, item] })
                }}
              >
                + Ürün
              </button>
            </div>

            <div className="admin-items">
              {category.items.map((item, index) => (
                <article key={item.id} className="admin-item">
                  <div className="admin-item__head">
                    <strong>
                      #{index + 1} {item.name.pl || item.name.en}
                    </strong>
                    <div className="admin-row wrap">
                      <button
                        type="button"
                        onClick={() =>
                          updateCategory({ items: moveItem(category.items, index, index - 1) })
                        }
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateCategory({ items: moveItem(category.items, index, index + 1) })
                        }
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="admin-danger"
                        onClick={() => {
                          if (!confirm('Ürünü sil?')) return
                          updateCategory({
                            items: category.items.filter((_, i) => i !== index),
                          })
                        }}
                      >
                        Sil
                      </button>
                    </div>
                  </div>

                  <label className="admin-upload">
                    Ürün fotoğrafı
                    {item.image ? <img src={item.image} alt="" /> : <span>Foto seç</span>}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        onUpload(e.target.files?.[0], 'item', (url) =>
                          updateItem(index, { image: url }),
                        )
                      }
                    />
                  </label>

                  <div className="admin-fields">
                    {languages.map((l) => (
                      <label key={l.code}>
                        İsim ({l.label})
                        <input
                          value={item.name[l.code]}
                          onChange={(e) =>
                            updateItem(index, {
                              name: { ...item.name, [l.code]: e.target.value },
                            })
                          }
                        />
                      </label>
                    ))}
                  </div>

                  <div className="admin-prices">
                    <h4>Fiyatlar</h4>
                    {item.prices.map((price, pIndex) => (
                      <div key={pIndex} className="admin-price-row">
                        <label>
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
                              updateItem(index, { prices })
                            }}
                          />
                        </label>
                        <label>
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
                              updateItem(index, { prices })
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(index, {
                              prices: item.prices.filter((_, i) => i !== pIndex),
                            })
                          }
                        >
                          Fiyat sil
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateItem(index, {
                          prices: [...item.prices, { amount: 0 }],
                        })
                      }
                    >
                      + Fiyat
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <div className="admin-sticky-save">
        <button type="button" className="admin-primary" onClick={onSave} disabled={saving}>
          {saving ? 'Kaydediliyor...' : 'Tüm değişiklikleri kaydet'}
        </button>
      </div>
    </div>
  )
}
