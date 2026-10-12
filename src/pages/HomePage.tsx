import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LangDropdown } from '../components/LangDropdown'
import { ReviewButton } from '../components/ReviewButton'
import { djAlp } from '../data/djAlp'
import { pastEvents, upcomingEvents, type ClubEvent } from '../data/events'
import {
  GOOGLE_MAPS_URL,
  PLACE_ADDRESS,
  PLACE_PHONE,
  PLACE_RATING,
  PLACE_REVIEW_COUNT,
  googleFiveStarReviews,
} from '../data/googleReviews'
import { instagramMedia } from '../data/instagramMedia'
import { homeCopy } from '../i18n/home'
import { detectLang } from '../i18n/languages'
import { legalNav, trLegal } from '../i18n/legal'
import { tr, ui } from '../i18n/ui'
import { fetchContent } from '../lib/api'
import { localizeContent } from '../lib/localizeContent'
import type { Lang, SiteContent } from '../types/content'
import { createDefaultContent } from '../data/defaultContent'
import './home.css'

export default function HomePage() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return detectLang()
    } catch {
      return 'pl'
    }
  })
  const [content, setContent] = useState<SiteContent>(() =>
    localizeContent(createDefaultContent()),
  )

  useEffect(() => {
    fetchContent().then(setContent)
  }, [])

  useEffect(() => {
    localStorage.setItem('labirynt-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const heroVideo = useMemo(
    () => instagramMedia.find((m) => m.type === 'video'),
    [],
  )
  const gallery = useMemo(() => instagramMedia.slice(0, 18), [])

  const features = [
    { title: homeCopy.featureDjTitle, text: homeCopy.featureDjText },
    { title: homeCopy.featureBarTitle, text: homeCopy.featureBarText },
    { title: homeCopy.featureShishaTitle, text: homeCopy.featureShishaText },
    { title: homeCopy.featureTerraceTitle, text: homeCopy.featureTerraceText },
  ]

  const renderEvent = (event: ClubEvent) => (
    <article key={event.id} className="home-event" id={event.id}>
      <div className="home-event__media">
        <img className="home-event__cover" src={event.cover} alt="" loading="lazy" />
        {event.video ? (
          <video
            className="home-event__video"
            src={event.video.src}
            poster={event.video.poster}
            controls
            playsInline
            preload="metadata"
          />
        ) : null}
      </div>
      <div className="home-event__copy">
        <p className={`home-event__status home-event__status--${event.status}`}>
          {event.status === 'upcoming'
            ? tr(homeCopy.eventsUpcoming, lang)
            : tr(homeCopy.eventsPast, lang)}
        </p>
        <p className="home-event__date">{tr(event.dateLabel, lang)}</p>
        <h3>{tr(event.title, lang)}</h3>
        <p>{tr(event.text, lang)}</p>
        <dl className="home-event__meta">
          {event.lineup ? (
            <div>
              <dt>{tr(homeCopy.eventsLineup, lang)}</dt>
              <dd>{event.lineup}</dd>
            </div>
          ) : null}
          {event.genres ? (
            <div>
              <dt>{tr(homeCopy.eventsGenres, lang)}</dt>
              <dd>{event.genres}</dd>
            </div>
          ) : null}
          {event.entry ? (
            <div>
              <dt>{tr(homeCopy.eventsEntry, lang)}</dt>
              <dd>{tr(event.entry, lang)}</dd>
            </div>
          ) : null}
        </dl>
        <div className="home-event__gallery">
          {event.gallery.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </article>
  )

  return (
    <div className="home">
      <header className="home-nav">
        <a className="home-brand" href="#top">
          <img src={content.logoImage} alt="" width={40} height={40} />
          <span>LABIRYNT</span>
        </a>
        <nav className="home-links">
          <a href="#about">{tr(homeCopy.navAbout, lang)}</a>
          <a href="#nights">{tr(homeCopy.navNights, lang)}</a>
          <a href="#dj">{tr(homeCopy.navDj, lang)}</a>
          <a href="#events">{tr(homeCopy.navEvents, lang)}</a>
          <a href="#gallery">{tr(homeCopy.navGallery, lang)}</a>
          <a href="#reviews">{tr(homeCopy.navReviews, lang)}</a>
          <a href="#visit">{tr(homeCopy.navVisit, lang)}</a>
          <Link to="/menu" className="home-nav-cta">
            {tr(homeCopy.navMenu, lang)}
          </Link>
        </nav>
        <LangDropdown lang={lang} onChange={setLang} />
      </header>

      <section className="home-hero" id="top">
        <div className="home-hero__media" aria-hidden="true">
          {heroVideo ? (
            <video
              className="home-hero__video"
              src={heroVideo.src}
              poster={heroVideo.poster || content.heroImage}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img src={content.heroImage} alt="" />
          )}
          <div className="home-hero__veil" />
        </div>
        <div className="home-hero__copy">
          <img src={content.logoImage} alt="Labirynt Club" className="home-hero__logo" />
          <h1>LABIRYNT</h1>
          <p className="home-hero__title">{tr(homeCopy.heroTitle, lang)}</p>
          <p className="home-hero__text">{tr(homeCopy.heroText, lang)}</p>
          <div className="home-hero__actions">
            <Link to="/menu" className="home-btn home-btn--neon">
              {tr(homeCopy.ctaMenu, lang)}
            </Link>
            <a
              className="home-btn home-btn--ghost"
              href="https://www.instagram.com/labirynt_club/"
              target="_blank"
              rel="noreferrer"
            >
              @labirynt_club
            </a>
          </div>
        </div>
      </section>

      <section className="home-section" id="about">
        <div className="home-section__inner home-about">
          <div>
            <h2>{tr(homeCopy.aboutTitle, lang)}</h2>
            <p className="home-lead">{tr(homeCopy.aboutLead, lang)}</p>
            <p>{tr(homeCopy.aboutText, lang)}</p>
            <p>{tr(homeCopy.aboutExtra, lang)}</p>
            <Link to="/menu" className="home-btn home-btn--neon">
              {tr(homeCopy.ctaMenu, lang)}
            </Link>
          </div>
          <img src={content.heroImage} alt="Labirynt Club entrance" className="home-about__img" />
        </div>
      </section>

      <section className="home-section home-section--nights" id="nights">
        <div className="home-section__inner">
          <div className="home-section__head">
            <h2>{tr(homeCopy.nightsTitle, lang)}</h2>
            <p>{tr(homeCopy.nightsText, lang)}</p>
          </div>
          <div className="home-features">
            {features.map((item) => (
              <article key={item.title.en} className="home-feature">
                <h3>{tr(item.title, lang)}</h3>
                <p>{tr(item.text, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--dj" id="dj">
        <div className="home-section__inner">
          <div className="home-dj">
            <div className="home-dj__copy">
              <p className="home-dj__eyebrow">{tr(homeCopy.djEyebrow, lang)}</p>
              <h2>{tr(homeCopy.djTitle, lang)}</h2>
              <p className="home-lead">{tr(homeCopy.djLead, lang)}</p>
              <p>{tr(homeCopy.djText, lang)}</p>
              <p>{tr(homeCopy.djExtra, lang)}</p>
              <div className="home-hero__actions">
                <a
                  className="home-btn home-btn--neon"
                  href={djAlp.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tr(homeCopy.djCtaIg, lang)}
                </a>
                <a
                  className="home-btn home-btn--ghost"
                  href={djAlp.soundcloud}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tr(homeCopy.djCtaSc, lang)}
                </a>
              </div>
            </div>
            <img
              className="home-dj__portrait"
              src={djAlp.avatar}
              alt="DJ Alp · Alp Kınacı"
            />
          </div>
          <div className="home-dj__photos-head">
            <h3>{tr(homeCopy.djPhotosTitle, lang)}</h3>
          </div>
          <div className="home-dj__photos">
            {djAlp.photos.map((photo) => (
              <figure key={photo.src} className="home-dj__photo">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--events" id="events">
        <div className="home-section__inner">
          <div className="home-section__head">
            <h2>{tr(homeCopy.eventsTitle, lang)}</h2>
            <p>{tr(homeCopy.eventsText, lang)}</p>
          </div>

          {upcomingEvents.length ? (
            <div className="home-events-block">
              <h3 className="home-events-block__title">{tr(homeCopy.eventsUpcoming, lang)}</h3>
              <div className="home-events">{upcomingEvents.map(renderEvent)}</div>
            </div>
          ) : null}

          <div className="home-events-block">
            <h3 className="home-events-block__title">{tr(homeCopy.eventsPast, lang)}</h3>
            <div className="home-events">{pastEvents.map(renderEvent)}</div>
          </div>

          <a
            className="home-btn home-btn--ghost"
            href="https://www.instagram.com/labirynt_club/"
            target="_blank"
            rel="noreferrer"
          >
            {tr(homeCopy.eventsIgCta, lang)}
          </a>
        </div>
      </section>

      <section className="home-section home-section--gallery" id="gallery">
        <div className="home-section__inner">
          <div className="home-section__head">
            <h2>{tr(homeCopy.galleryTitle, lang)}</h2>
            <p>{tr(homeCopy.galleryText, lang)}</p>
          </div>
          <div className="home-gallery">
            {gallery.map((item) =>
              item.type === 'video' ? (
                <article key={item.src} className="home-gallery__item home-gallery__item--video">
                  <video
                    src={item.src}
                    poster={item.poster}
                    controls
                    playsInline
                    preload="metadata"
                  />
                </article>
              ) : (
                <article key={item.src} className="home-gallery__item">
                  <img src={item.src} alt="Labirynt Club" loading="lazy" />
                </article>
              ),
            )}
          </div>
          <a
            className="home-btn home-btn--ghost home-gallery__more"
            href="https://www.instagram.com/labirynt_club/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram · @labirynt_club
          </a>
        </div>
      </section>

      <section className="home-section home-section--reviews" id="reviews">
        <div className="home-section__inner">
          <div className="home-section__head home-reviews__head">
            <h2>{tr(homeCopy.reviewsTitle, lang)}</h2>
            <p>{tr(homeCopy.reviewsText, lang)}</p>
            <div className="home-reviews__score" aria-label={`Google ${PLACE_RATING} / 5`}>
              <span className="home-reviews__stars" aria-hidden="true">
                ★★★★★
              </span>
              <span className="home-reviews__rating">{PLACE_RATING}</span>
              <span className="home-reviews__count">
                {PLACE_REVIEW_COUNT} · {tr(homeCopy.reviewsMeta, lang)}
              </span>
            </div>
          </div>
          <div className="home-reviews">
            {googleFiveStarReviews.map((review) => (
              <blockquote key={review.text} className="home-review">
                <div className="home-review__stars" aria-label="5 / 5">
                  ★★★★★
                </div>
                <p>“{review.text}”</p>
                <footer>Google Maps · 5★</footer>
              </blockquote>
            ))}
          </div>
          <div className="home-reviews__actions">
            <a
              className="home-btn home-btn--ghost"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              {tr(homeCopy.reviewsCta, lang)}
            </a>
            <ReviewButton lang={lang} className="review-btn--home" />
          </div>
        </div>
      </section>

      <section className="home-section" id="visit">
        <div className="home-section__inner home-visit">
          <h2>{tr(homeCopy.visitTitle, lang)}</h2>
          <p>{tr(homeCopy.visitText, lang)}</p>
          <div className="home-visit__grid">
            <div>
              <h3>{tr(homeCopy.addressLabel, lang)}</h3>
              <p>{PLACE_ADDRESS}</p>
            </div>
            <div>
              <h3>{tr(homeCopy.phoneLabel, lang)}</h3>
              <p>
                <a href={`tel:${PLACE_PHONE.replace(/\s/g, '')}`}>{PLACE_PHONE}</a>
              </p>
            </div>
            <div>
              <h3>{tr(homeCopy.hoursTitle, lang)}</h3>
              <p>
                {tr(homeCopy.hoursWeek, lang)}
                <br />
                {tr(homeCopy.hoursWeekend, lang)}
              </p>
            </div>
          </div>
          <div className="home-hero__actions">
            <Link to="/menu" className="home-btn home-btn--neon">
              {tr(homeCopy.ctaMenu, lang)}
            </Link>
            <a
              className="home-btn home-btn--ghost"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              {tr(ui.location, lang)} · Google
            </a>
          </div>
          <ReviewButton lang={lang} className="review-btn--home" />
        </div>
      </section>

      <footer className="home-footer">
        <img src={content.logoImage} alt="" width={52} height={52} />
        <p>{tr(ui.footer, lang)}</p>
        <ReviewButton lang={lang} className="review-btn--home" />
        <div className="home-footer__links">
          <Link to="/menu">{tr(homeCopy.navMenu, lang)}</Link>
          <Link to="/rules">{trLegal(legalNav.rules, lang)}</Link>
          <Link to="/privacy">{trLegal(legalNav.privacy, lang)}</Link>
          <Link to="/terms">{trLegal(legalNav.terms, lang)}</Link>
        </div>
      </footer>
    </div>
  )
}
