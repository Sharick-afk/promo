/**
 * vendor
 */
import React from 'react'
import { NextPage, GetStaticProps } from 'next'
import classNames from 'classnames'
import getConfig from 'next/config'
import { FormattedMessage, FormattedNumber, IntlProvider } from 'react-intl'
import { useWindowSize } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useInViewport } from 'react-in-viewport'
import { Pagination } from 'swiper'
import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
/**
 * components
 */
import { FooterStyle, FooterExport as Footer } from 'src/components/Footer'
import Layout from 'src/components/Layout/LayoutPromo'
/**
 * api
 */
import productApi, { useProductQuery, Product2 } from 'src/api/product'
import { ICurrentPayment } from 'src/api/subscription'
/**
 * utils and hooks
 */
import useHeaders from 'src/hooks/useHeaders'
import useClientSide from 'src/hooks/useClientSide'
import useCustomForm from 'src/hooks/useForm'
/**
 * constants
 */
import { PERSONAL_DATA, OFERTA, PRIVACY_POLICY } from 'src/constants'
import { navigateCourse } from 'src/constants/router'
// translations
import Russian from 'src/translations/ru.json'
/**
 * styles
 */
import '@nextcss/reset'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/mousewheel'
import aboutStyle from './about.module.scss'
import advaStyle from './advantages.module.scss'
import adva2Style from './adva2.module.scss'
import expertsStyle from './experts.module.scss'
import faqStyle from './faq.module.scss'
import incomeStyle from './income.module.scss'
import globalStyle from './global.module.scss'
import headerStyle from './header.module.scss'
import introStyle from './intro.module.scss'
import orderStyle from './order.module.scss'
import processStyle from './process.module.scss'
import programStyle from './program.module.scss'
import promoStyle from './promo.module.scss'
import promo2Style from './promo2.module.scss'
import resultStyle from './results.module.scss'
import reviewsStyle from './reviews.module.scss'
import salariesStyle from './salaries.module.scss'
import sertStyle from './sert.module.scss'

const {
  publicRuntimeConfig: { EXPORT, STATIC_ASSETS_RU_URL },
} = getConfig()

const productSlug = 'copyraiter-a-z'
const landFolder = `${STATIC_ASSETS_RU_URL}/promo/${productSlug}-b/images`

const getMonthName = function (monthNumber: number) {
  const date = new Date()
  date.setMonth(monthNumber)
  return date.toLocaleString('ru-RU', { month: 'long' }).substring(0, 3)
}
const month = getMonthName(new Date().getMonth() - 1)

const getRandomDate = function () {
  const day = Math.floor(Math.random() * (30 - 1) + 1)
  return (
    day +
    ' ' +
    month +
    ' в ' +
    Math.floor(Math.random() * (23 - 0) + 0) +
    ':' +
    Math.floor(Math.random() * (59 - 10) + 10)
  )
}

interface review {
  pic: string
  name: string
  date: string
  text: string
  like: number
  comment: number
  repost: number
  watch: number
}
const reviews: review[] = [
  {
    pic: `${landFolder}/r1.png`,
    name: 'Милена Шорохова',
    date: getRandomDate(),
    text: 'Два года работаю маркетологом и чувствую, что мне не хватает знаний и навыков в некоторых областях. Решила активно это исправлять, для чего и пошла на этот курс. Я уже проходила курс WillSkill по Яндекс.Директу и осталась очень довольна, поэтому без раздумий решила обучаться копирайтингу именно у этих ребят. Курс топовый. Рассказывают, как правильно писать текст для чего угодно: рассылки, мессенджеры, личный блог. Научат копиратингу даже таких профанов, как я! Буду советовать этот курс всем. Больше грамотных копирайтиеров — больше вдохновляющих текстов!',
    like: 50,
    comment: 23,
    repost: 5,
    watch: 1024,
  },
  {
    pic: `${landFolder}/r3.png`,
    name: 'Никита Шарапин',
    date: getRandomDate(),
    text: 'Я студент, на курс пошел, потому что он недорогой, универу не мешает, и чтобы получить какой-то навык, чтобы подзаработать. Стал брать первые заказы на фрилансе еще во время обучения.  Советую WillSkill.',
    like: 71,
    comment: 14,
    repost: 10,
    watch: 505,
  },
  {
    pic: `${landFolder}/r2.png`,
    name: 'Елена Осипова',
    date: getRandomDate(),
    text: 'Удобная платформа, грамотный эксперт и доступная цена — все, что нужно для крутого обучения. Очень нравится, что никто не торопит с домашками. Учишься в своем темпе и получаешь от этого колоссальное удовольствие.',
    like: 113,
    comment: 22,
    repost: 6,
    watch: 811,
  },
  {
    pic: `${landFolder}/r4.png`,
    name: 'Ирина Голушко',
    date: getRandomDate(),
    text: 'Получила от курса все, что хотела. Я давно пыталась влиться в новую профессию, но мне всегда не хватало каких-то навыков или знаний. В курсе очень подробно говорят обо всех моментах, с которыми можно столкнуться при работе копирайтером. Очень быстро стала набирать заказы и вижу, что сильно выросла, как специалист.',
    like: 50,
    comment: 7,
    repost: 2,
    watch: 441,
  },
  {
    pic: `${landFolder}/r5.png`,
    name: 'Тамара Пихотина',
    date: getRandomDate(),
    text: 'Я решилась на этот курс, потому что мне хочется поскорей получить новую профессию и начать работать, а цены на образование сейчас аховые. И спасибо WillSkill — я спокойно отучилась, не ждала, пока накоплю, стала писать тексты на заказ. Пока все получается! Теперь буду пополнять портфолио. Спасибо вам!!',
    like: 97,
    comment: 34,
    repost: 20,
    watch: 1225,
  },
  {
    pic: `${landFolder}/r6.png`,
    name: 'Антон Борышко',
    date: getRandomDate(),
    text: 'Курс помог разобраться, как работать с текстом абсолютно на всех этапах. Интересно было узнавать новое и повышать свой скилл. Уверен, что я стал намного сильнее в профессиональном плане. Спасибо.',
    like: 22,
    comment: 4,
    repost: 5,
    watch: 609,
  },
]
const Page: NextPage = () => {
  const { headers, isLoggedIn } = useHeaders()
  const isClientSide = useClientSide()
  const { width } = useWindowSize()
  // react-queries
  const { data } = useProductQuery.useGetProductsSlug(
    productSlug,
    isLoggedIn,
    headers,
  )
  interface mousePos {
    x: number
    y: number
  }
  const [mousePos, setMousePos] = React.useState<mousePos>()

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const adva = React.useRef<HTMLDivElement>(null)
  const line = React.useRef<HTMLDivElement>(null)
  const sert = React.useRef<HTMLElement>(null)
  const separatorLine = React.useRef<HTMLDivElement>(null)
  const isAdvaVisible = useInViewport(adva)
  const isLineVisible = useInViewport(line)
  const isSertVisible = useInViewport(sert)

  const parall = () => {
    if (separatorLine.current != null) {
      const line = separatorLine.current
      line.style.height = `calc(100% - 25vh - ${
        line.getBoundingClientRect().top
      }px`
    }
  }
  React.useEffect(() => {
    window.addEventListener('scroll', parall)
    return () => {
      window.removeEventListener('scroll', parall)
    }
  }, [])

  const [clicked, setClicked] = React.useState('1')
  const handleToggle = (index: string) => {
    if (clicked === index) {
      setClicked('0')
    } else {
      setClicked(index)
    }
  }

  const [clicked3, setClicked3] = React.useState(false)
  return (
    <IntlProvider locale='ru' messages={Russian} defaultLocale='ru'>
      <Layout>
        <Head>
          <title>
            Обучение копирайтингу с нуля для начинающих онлайн – Willskill
          </title>
          <meta
            name='description'
            content='Обучение копирайтингу с нуля по курсу «Копирайтер от А до Я» На нашей платформе вы можете пройти пошаговое обучение копирайтингу для начинающих с опытными экспертами.'
          />
        </Head>
        <div className={classNames(globalStyle['copyraiter-a-z-b'])}>
          {/* header */}
          <header className={classNames(headerStyle.header)}>
            <div className='header__container container'>
              {JSON.parse(EXPORT) && (
                <div className='header__logo'>
                  <a className='header__logo-image'>
                    <picture>
                      <img
                        data-src={`${landFolder}/logo.svg`}
                        alt='logo'
                        className='lazyload'
                      />
                    </picture>
                  </a>
                </div>
              )}
              {!JSON.parse(EXPORT) && (
                <div className='header__logo'>
                  <a href='/' className='header__logo-image'>
                    <picture>
                      <img
                        data-src={`${landFolder}/logo.svg`}
                        alt='logo'
                        className='lazyload'
                      />
                    </picture>
                  </a>
                </div>
              )}

              {data && !JSON.parse(EXPORT) && (
                <nav className='header__nav'>
                  <ul className='header__list'>
                    <li>
                      <a href='#experts'>Эксперты</a>
                    </li>
                    <li>
                      <a href='#programm'>Программа курса</a>
                    </li>
                    <li>
                      <a href='#reviews'>Отзывы</a>
                    </li>
                    <li>
                      <a href='#faq'>FAQ</a>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </header>
          {/* main */}
          <main>
            {/* intro */}
            <section className={introStyle.intro}>
              <div className='container'>
                <h1>
                  Начните зарабатывать
                  <br /> на тексте
                  {data && <span>С курсом “{data.course.title}”</span>}
                </h1>
                {width < 998 && isClientSide && (
                  <div>
                    <Swiper
                      modules={[Pagination]}
                      spaceBetween={20}
                      slidesPerView={1}
                      loop={true}
                      pagination={{
                        el: '.intro__pagination',
                        type: 'bullets',
                        clickable: true,
                      }}
                      breakpoints={{
                        320: {
                          slidesPerView: 1,
                        },
                      }}
                      className='swiper-container intro__slider'
                    >
                      <SwiperSlide className='intro__item'>
                        <div></div>
                        <picture>
                          <img
                            data-src={`${landFolder}/ic1.svg`}
                            alt='rocket'
                            className='lazyload'
                          />
                        </picture>
                        <p>Научитесь превращать скучное в захватывающее</p>
                      </SwiperSlide>
                      <SwiperSlide className='intro__item'>
                        <div></div>
                        <picture>
                          <img
                            data-src={`${landFolder}/ic2.svg`}
                            alt='calendar'
                            className='lazyload'
                          />
                        </picture>
                        <p>Сможете писать сильные тексты для любой ниши</p>
                      </SwiperSlide>
                      <SwiperSlide className='intro__item'>
                        <div></div>
                        <picture>
                          <img
                            data-src={`${landFolder}/ic3.svg`}
                            alt='money'
                            className='lazyload'
                          />
                        </picture>
                        <p>Обретёте навыки, за которые готовы платить</p>
                      </SwiperSlide>
                    </Swiper>
                    <div className='intro__pagination swiper-pagination' />
                  </div>
                )}
                {width >= 998 && (
                  <div className='intro__items'>
                    <div className='intro__item'>
                      <div></div>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic1.svg`}
                          alt='rocket'
                          className='lazyload'
                        />
                      </picture>
                      <p>Научитесь превращать скучное в захватывающее</p>
                    </div>
                    <div className='intro__item'>
                      <div></div>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic2.svg`}
                          alt='calendar'
                          className='lazyload'
                        />
                      </picture>
                      <p>Сможете писать сильные тексты для любой ниши</p>
                    </div>
                    <div className='intro__item'>
                      <div></div>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic3.svg`}
                          alt='money'
                          className='lazyload'
                        />
                      </picture>
                      <p>Обретёте навыки, за которые готовы платить</p>
                    </div>
                  </div>
                )}
                <div className='intro__row'>
                  <a href='#order-section' className='btn btn--main'>
                    Попробовать
                  </a>
                  <p>
                    Первые 7 дней всего за
                    <span> 1 рубль</span>
                  </p>
                </div>
                {mousePos && (
                  <div className='intro__pic'>
                    <picture
                      style={{
                        transform: `translate(${mousePos?.x / 400}px, ${
                          mousePos?.y / 500
                        }px)`,
                      }}
                    >
                      <img
                        data-src={`${landFolder}/11.png`}
                        alt='notepad'
                        className='lazyload'
                      />
                    </picture>
                    <picture
                      style={{
                        transform: `translate(${mousePos?.x / -300}px, ${
                          mousePos?.y / -200
                        }px)`,
                      }}
                    >
                      <img
                        data-src={`${landFolder}/12.png`}
                        alt='pen'
                        className='lazyload'
                      />
                    </picture>
                    <picture
                      style={{
                        transform: `translate(${mousePos?.x / 700}px, ${
                          mousePos?.y / 300
                        }px)`,
                      }}
                    >
                      <img
                        data-src={`${landFolder}/13.png`}
                        alt='plant'
                        className='lazyload'
                      />
                    </picture>
                    <picture
                      style={{
                        transform: `translate(${mousePos?.x / -100}px, ${
                          mousePos?.y / -500
                        }px)`,
                      }}
                    >
                      <img
                        data-src={`${landFolder}/14.png`}
                        alt='notebook'
                        className='lazyload'
                      />
                    </picture>
                  </div>
                )}
                <div className='intro__content'>
                  <div className='intro__content-item'>
                    <div></div>
                    <span>17</span>
                    <p>недель обучения</p>
                  </div>
                  <div className='intro__content-item'>
                    <div></div>
                    <span>30</span>
                    <p>часов практики</p>
                  </div>
                  <div className='intro__content-item'>
                    <div></div>
                    <span>2</span>
                    <p>эксперта</p>
                  </div>
                </div>
              </div>
            </section>
            {/* adva */}
            <section className={advaStyle.adva} ref={adva}>
              <div
                className={classNames('container', {
                  active: isAdvaVisible.inViewport,
                })}
              >
                <div className='adva__head'>
                  <h2 className='title'>
                    Копирайтер — одна из самых перспективных профессий на рынке
                  </h2>
                  <p>
                    И притягательность этой специальности очень легко объяснить
                  </p>
                  <div className='adva__pic'>
                    <picture>
                      <img
                        data-src={`${landFolder}/22.png`}
                        alt='table with notebook and papers'
                        className='lazyload'
                      />
                    </picture>
                    <picture>
                      <img
                        data-src={`${landFolder}/21.png`}
                        alt='hands with money'
                        className='lazyload'
                      />
                    </picture>
                  </div>
                </div>
                <div className='adva__body'>
                  <div className='adva__item'>
                    <div></div>
                    <picture>
                      <img
                        data-src={`${landFolder}/ic4.svg`}
                        alt='airplane'
                        className='lazyload'
                      />
                    </picture>
                    <h3>Быстрый старт</h3>
                    <p>Первые заказы вы сможете взять ещё во время обучения.</p>
                  </div>
                  <div className='adva__item'>
                    <div></div>
                    <picture>
                      <img
                        data-src={`${landFolder}/ic5.svg`}
                        alt='money'
                        className='lazyload'
                      />
                    </picture>
                    <h3>Высокий спрос на специалистов</h3>
                    <p>
                      Более 2300 компаний находятся в поиске грамотного
                      копирайтера.
                    </p>
                  </div>
                  <div className='adva__item'>
                    <div></div>
                    <picture>
                      <img
                        data-src={`${landFolder}/ic6.svg`}
                        alt='person'
                        className='lazyload'
                      />
                    </picture>
                    <h3>Возможность работы на себя</h3>
                    <p>
                      Из любой точки мира. С проектами, интересными именно вам.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* promo */}
            <section className={promoStyle.promo}>
              <div className='container'>
                <div className='promo__body'>
                  <div></div>
                  <h2 className='title'>
                    Впервые слышите про копирайтинг? Не беда!
                  </h2>
                  <p>Освоить профессию копирайтера может каждый.</p>
                  <h3>
                    С вас желание учиться, с нас — крутые эксперты и грамотная
                    программа.
                  </h3>
                </div>
              </div>
            </section>
            {/* salaries */}
            <section className={salariesStyle.salaries}>
              <div className='container'>
                <h2 className='title'>Зарплата копирайтера</h2>
                <p className='salaries__text'>По данным hh.ru </p>
                <div className='salaries__body'>
                  <div className='salaries__item'>
                    <span>от 40 000₽</span>
                    <p>Без опыта работы</p>
                  </div>
                  <div className='salaries__item'>
                    <span>от 80 000₽</span>
                    <p>С опытом работы от 1 года</p>
                  </div>
                  <div className='salaries__item'>
                    <span>от 155 000₽</span>
                    <p>С опытом работы от 3 лет</p>
                  </div>
                  <div className='salaries__line'>
                    <span
                      className='salaries__line-cover'
                      ref={separatorLine}
                    ></span>
                  </div>
                </div>
                <h2 className='title'>И это далеко не предел!</h2>
              </div>
            </section>
            {/* result */}
            <section className={resultStyle.results}>
              <div className='container'>
                <h2 className='title'>
                  Взгляните на несколько работ копирайтера:
                </h2>

                {width < 998 && isClientSide && (
                  <div>
                    <Swiper
                      modules={[Pagination]}
                      spaceBetween={20}
                      slidesPerView={1}
                      pagination={{
                        el: '.result__pagination',
                        type: 'bullets',
                        clickable: true,
                      }}
                      breakpoints={{
                        320: {
                          slidesPerView: 1,
                        },
                      }}
                      className='swiper-container intro__slider'
                    >
                      <SwiperSlide className='result__item result-item'>
                        <div>
                          <h3>ДО</h3>
                          <p>
                            Продам солнцезащитные очки. Качество хорошее,
                            выглядят здорово. Очень прочные линзы, не бликуют.
                          </p>
                        </div>
                        <div className='result-item__border'></div>
                        <div>
                          <h3>ПОСЛЕ</h3>
                          <p>
                            Солнцезащитные очки «Marlo» — непревзойдённое
                            качество и безупречный стиль. Сверхпрочные линзы,
                            выполненные из триацетата целлюлозы, блокируют блики
                            и делают вашу жизнь ещё более комфортной.
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className='result__item result-item'>
                        <div>
                          <h3>ДО</h3>
                          <p>
                            Скоро парфюмерный магазин «Georgia» открывает
                            ещё одну точку. Приходите на открытие. Шампанское
                            и конфеты бесплатно.
                          </p>
                        </div>
                        <div className='result-item__border'></div>
                        <div>
                          <h3>ПОСЛЕ</h3>
                          <p>
                            Парфюмерный бутик «Georgia» активно расширяет свои
                            горизонты! Уже в эту пятницу состоится открытие
                            нового магазина, и мы с нетерпением ждём вас!
                            Шампанское и десерты — наш комплимент для вас!
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className='result__item result-item'>
                        <div>
                          <h3>ДО</h3>
                          <p>
                            Хотите открыть свой бизнес? Это даст
                            вам возможности, деньги, риски и ответственность.
                            Если вы очень хотите, у нас в телеграме есть пост
                            с 7 направлениями, в которых лучше открывать бизнес
                            сейчас.
                          </p>
                        </div>
                        <div className='result-item__border'></div>
                        <div>
                          <h3>ПОСЛЕ</h3>
                          <p>
                            Свой бизнес — простор для возможностей и финансового
                            роста. А ещё — риски и большая ответственность.
                            Полны решимости? Мы подготовили
                            для вас 7 направлений для открытия собственного
                            дела. Читайте подробнее в нашем телеграм-канале!
                          </p>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                    <div className='result__pagination'></div>
                  </div>
                )}
                {width >= 998 && (
                  <div className='result__body'>
                    <div className='result__item result-item'>
                      <div>
                        <h3>ДО</h3>
                        <p>
                          Продам солнцезащитные очки. Качество хорошее, выглядят
                          здорово. Очень прочные линзы, не бликуют.
                        </p>
                      </div>
                      <div className='result-item__border'></div>
                      <div>
                        <h3>ПОСЛЕ</h3>
                        <p>
                          Солнцезащитные очки «Marlo» — непревзойдённое качество
                          и безупречный стиль. Сверхпрочные линзы, выполненные
                          из триацетата целлюлозы, блокируют блики и делают вашу
                          жизнь ещё более комфортной.
                        </p>
                      </div>
                    </div>
                    <div className='result__item result-item'>
                      <div>
                        <h3>ДО</h3>
                        <p>
                          Скоро парфюмерный магазин «Georgia» открывает ещё одну
                          точку. Приходите на открытие. Шампанское и конфеты
                          бесплатно.
                        </p>
                      </div>
                      <div className='result-item__border'></div>
                      <div>
                        <h3>ПОСЛЕ</h3>
                        <p>
                          Парфюмерный бутик «Georgia» активно расширяет свои
                          горизонты! Уже в эту пятницу состоится открытие нового
                          магазина, и мы с нетерпением ждём вас! Шампанское
                          и десерты — наш комплимент для вас!
                        </p>
                      </div>
                    </div>
                    <div className='result__item result-item'>
                      <div>
                        <h3>ДО</h3>
                        <p>
                          Хотите открыть свой бизнес? Это даст вам возможности,
                          деньги, риски и ответственность. Если вы очень хотите,
                          у нас в телеграме есть пост с 7 направлениями,
                          в которых лучше открывать бизнес сейчас.
                        </p>
                      </div>
                      <div className='result-item__border'></div>
                      <div>
                        <h3>ПОСЛЕ</h3>
                        <p>
                          Свой бизнес — простор для возможностей и финансового
                          роста. А ещё — риски и большая ответственность. Полны
                          решимости? Мы подготовили для вас 7 направлений
                          для открытия собственного дела. Читайте подробнее
                          в нашем телеграм-канале!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
            {/* about */}
            <section className={aboutStyle.about}>
              <div className='container'>
                <div className='about__pic'>
                  <picture>
                    <img
                      data-src={`${landFolder}/3.png`}
                      alt='write-mashine'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m14.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m15.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m16.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m4.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m5.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m6.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m7.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m8.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m9.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m10.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m11.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m12.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                  <picture>
                    <img
                      data-src={`${landFolder}/m14.png`}
                      alt='money'
                      className='lazyload'
                    />
                  </picture>
                </div>
                <div className='about__col'>
                  <h2 className='title'>Почему копирайтинг стоит дорого?</h2>
                  <div className='about__wrapper'>
                    <div></div>
                    <p>
                      Копирайтинг — это написание текстов, которые будут
                      продвигать, рекламировать и продавать продукт.
                      Они рассказывают о товарах или услугах, вызывают доверие
                      у читателей, показывают преимущества продукта.
                    </p>
                    <p>
                      Все это очень важно для сайтов, социальных сетей,
                      маркетплейсов, онлайн-магазинов, досок объявлений и много
                      другого. Услуги копиратера способны принести компаниям
                      большие деньги, и за это люди готовы щедро платить.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* promo2 */}
            <section className={promo2Style.promo2}>
              <div className='container'>
                <div className='promo2__body'>
                  <div></div>
                  <picture>
                    <img
                      data-src={`${landFolder}/4.png`}
                      alt='write-mashine'
                      className='lazyload'
                    />
                  </picture>
                  <div className='promo2__col'>
                    <h2 className='title'>Звучит интересно? </h2>
                    <p>Превратите свой текст в деньги!</p>
                    <a href='#order-section' className='btn btn--main'>
                      Попробовать
                    </a>
                  </div>
                </div>
              </div>
            </section>
            {/* experts */}
            <section className={expertsStyle.experts} id='experts'>
              <div className='container'>
                <h2 className='title'>Эксперты курса</h2>
                <div className='experts__body'>
                  <div className='experts__item'>
                    <div></div>
                    <picture>
                      <img
                        data-src={`${landFolder}/a1.jpg`}
                        alt='woman'
                        className='lazyload'
                      />
                    </picture>
                    <h3>Юлия Липунцова</h3>
                    <ul>
                      <li>
                        Копирайтер с педагогическим образованием и 3-летним
                        опытом в коммерческих текстах.
                      </li>
                      <li>
                        Работает с разными форматами — от постов для социальных
                        сетей до SEO и лендингов.
                      </li>
                      <li>За годы работы написала больше 3 000 текстов.</li>
                      <li>Обучила более 70 копирайтеров.</li>
                      <li>
                        Собрала свой опыт в полноценный курс, чтобы помочь вам
                        успешно стартовать в копирайтинге.
                      </li>
                    </ul>
                  </div>
                  <div className='experts__item'>
                    <div></div>
                    <picture>
                      <img
                        data-src={`${landFolder}/a2.jpg`}
                        alt='woman'
                        className='lazyload'
                      />
                    </picture>
                    <h3>Мария Кошель</h3>
                    <ul>
                      <li>Методолог онлайн-курсов.</li>
                      <li>Опыт работы в бизнес-образовании более 14 лет.</li>
                      <li>
                        Внедряла образовательные проекты в компаниях METRO C&C,
                        ФТС Пятерочка
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            {/* program */}
            <section className={programStyle.program} id='programm'>
              <div className=' container'>
                <div className='program__head'>
                  <h2 className='title'>
                    Курс, с которым невозможно не начать зарабатывать
                  </h2>
                  <p>
                    Даже если вы новичок и ничего не слышали про копирайтинг,
                    наша команда сделает все, чтобы вы смогли зарабатывать уже
                    во время обучения.
                  </p>
                </div>
                {data && <ProgramAccordion data={data} />}
              </div>
            </section>
            {/* income */}
            <section className={incomeStyle.income}>
              <div className='container'>
                <picture>
                  <source
                    media='(max-width:998px )'
                    srcSet={`${landFolder}/bg2m.svg`}
                  />
                  <img
                    data-src={`${landFolder}/bg2.svg`}
                    alt='background'
                    className='lazyload'
                  />
                </picture>
                <h2 className='title'>
                  Печатая текст —
                  <br /> печатайте деньги
                </h2>
                <p className='income__text'>
                  Для этого регистрируйтесь на курс прямо сейчас и осваивайте
                  навыки, за которые готовы платить!
                </p>
                <a href='#order-section' className='btn btn--main'>
                  Попробовать
                </a>
                <p className='income__price'>
                  за
                  <span> 1 рубль</span>
                </p>
              </div>
            </section>
            {/* adva2 */}
            <section className={adva2Style.adva2}>
              <div className='container'>
                <h2 className='title'>Почему выбирают именно нас?</h2>
                <div
                  className={classNames('adva2__body', {
                    active: clicked3,
                  })}
                >
                  <div className='adva2__item'>
                    <div></div>
                    <h3>52 коротких видео-урока</h3>
                    <p>Подробные пояснения для эффективного обучения</p>
                  </div>

                  <div className='adva2__item'>
                    <div></div>
                    <h3>2 опытных эксперта</h3>
                    <p>Обучение у действующих копирайтеров с мощными кейсами</p>
                  </div>
                  <div className='adva2__item'>
                    <div></div>
                    <h3>30 часов практики</h3>
                    <p>Для закрепления изученного материала</p>
                  </div>
                  <div className='adva2__item'>
                    <div></div>
                    <h3>Удобный формат обучения</h3>
                    <p>Только вам решать, где и когда вы будете заниматься</p>
                  </div>
                  <div className='adva2__item'>
                    <div></div>
                    <h3>Без кредитов и рассрочек</h3>
                    <p>
                      Обучение проходит по подписке, а значит, не ударит по
                      кошельку!
                    </p>
                  </div>
                  <div className='adva2__item'>
                    <div></div>
                    <h3>Учитесь в своем темпе</h3>
                    <p>
                      Ставьте уроки на паузу, пересматривайте и получайте новую
                      профессию
                    </p>
                  </div>
                  <div className='adva2__item'>
                    <div></div>
                    <h3>Образовательная лицензия</h3>
                    <p>
                      У нас все официально, поэтому вы можете вернуть налоговый
                      вычет за оплату обучения. Так стоимость обучения будет ещё
                      ниже.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setClicked3(!clicked3)}
                  className={classNames('adva2__button', {
                    active: clicked3,
                  })}
                >
                  <picture>
                    <img
                      data-src={`${landFolder}/drop.svg`}
                      alt='arrow-down'
                      className='lazyload'
                    />
                  </picture>
                </button>
              </div>
            </section>
            {/* process */}
            <section className={processStyle.process}>
              <div className='container'>
                <h2 className='title'>Как проходит обучение</h2>

                {width < 998 && isClientSide && (
                  <div>
                    <Swiper
                      modules={[Pagination]}
                      spaceBetween={20}
                      slidesPerView={1}
                      pagination={{
                        el: '.process__pagination',
                        type: 'bullets',
                        clickable: true,
                      }}
                      breakpoints={{
                        320: {
                          slidesPerView: 1,
                        },
                      }}
                      className='swiper-container process__slider'
                    >
                      <SwiperSlide className='process__item'>
                        <div></div>
                        <picture>
                          <img
                            data-src={`${landFolder}/ic7.svg`}
                            alt='wifi icon'
                            className='lazyload'
                          />
                        </picture>
                        <p>
                          Учитесь онлайн в удобное для вас время из любой точки
                          мира.
                        </p>
                      </SwiperSlide>
                      <SwiperSlide className='process__item'>
                        <div></div>
                        <picture>
                          <img
                            data-src={`${landFolder}/ic8.svg`}
                            alt='book'
                            className='lazyload'
                          />
                        </picture>
                        <p>
                          Перенимайте знания реальных экспертов в обрасти
                          копирайтинга.
                        </p>
                      </SwiperSlide>
                      <SwiperSlide className='process__item'>
                        <div></div>
                        <picture>
                          <img
                            data-src={`${landFolder}/ic10.svg`}
                            alt='bill'
                            className='lazyload'
                          />
                        </picture>
                        <p>
                          Применяйте на практике полученные навыки и начинайте
                          зарабатывать.
                        </p>
                      </SwiperSlide>
                    </Swiper>
                    <div className='process__pagination swiper-pagination' />
                  </div>
                )}
                {width >= 998 && (
                  <div className='process__body'>
                    <div className='process__item'>
                      <div></div>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic7.svg`}
                          alt='wifi icon'
                          className='lazyload'
                        />
                      </picture>
                      <p>
                        Учитесь онлайн в удобное для вас время из любой точки
                        мира.
                      </p>
                    </div>
                    <div className='process__item'>
                      <div></div>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic8.svg`}
                          alt='book'
                          className='lazyload'
                        />
                      </picture>
                      <p>
                        Перенимайте знания реальных экспертов в обрасти
                        копирайтинга.
                      </p>
                    </div>
                    <div className='process__item'>
                      <div></div>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic9.svg`}
                          alt='pen'
                          className='lazyload'
                        />
                      </picture>
                      <p>
                        Выполняйте домашние задания для закрепления полученных
                        знаний, за которые работодатели готовы платить.
                      </p>
                    </div>
                    <div className='process__item'>
                      <div></div>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic9.svg`}
                          alt='bill'
                          className='lazyload'
                        />
                      </picture>
                      <p>
                        Применяйте на практике полученные навыки и начинайте
                        зарабатывать.
                      </p>
                    </div>
                    <div
                      ref={line}
                      className={classNames('process__line', {
                        active: isLineVisible.inViewport,
                      })}
                    >
                      <svg
                        width='790'
                        height='790'
                        viewBox='0 0 790 790'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M427.999 4.50002C508.499 2.00003 682 25.0001 646.499 80C595.392 159.179 9.49942 -72.4999 4.49928 183.5C-0.676652 448.5 779.317 117.062 785 378C791 653.5 165 331.314 165 599.5C165 769 678 540.5 678 789.5'
                          stroke='url(#paint0_linear_3745_21043)'
                          strokeWidth='8'
                          id='line'
                        />
                        <defs>
                          <linearGradient
                            id='paint0_linear_3745_21043'
                            x1='457.562'
                            y1='8.50006'
                            x2='457.562'
                            y2='795.5'
                            gradientUnits='userSpaceOnUse'
                          >
                            <stop stopColor='#A13AB3' />
                            <stop offset='0.1875' stopColor='#575FDD' />
                            <stop offset='0.458333' stopColor='#A13AB3' />
                            <stop offset='0.661458' stopColor='#575FDD' />
                            <stop offset='1' stopColor='#A13AB3' />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </section>
            {/* sert */}
            <section className={sertStyle.sert}>
              <div className='container'>
                <picture
                  ref={sert}
                  className={classNames({
                    active: isSertVisible.inViewport,
                  })}
                >
                  <img
                    data-src={`${landFolder}/sert1.png`}
                    alt='sert'
                    className='lazyload'
                  />
                </picture>
                <picture>
                  <img
                    data-src={`${landFolder}/sert2.png`}
                    alt='sert'
                    className='lazyload'
                  />
                </picture>
                <picture>
                  <img
                    data-src={`${landFolder}/sert3.png`}
                    alt='sert'
                    className='lazyload'
                  />
                </picture>
                <picture>
                  <source
                    media='(max-width:998px )'
                    srcSet={`${landFolder}/bg4m.png`}
                  />
                  <img
                    data-src={`${landFolder}/bg4.png`}
                    alt='background'
                    className='lazyload'
                  />
                </picture>
                <div className='sert__head'>
                  <h2 className='title'>
                    Получите именной сертификат
                    <br /> при успешном завершении курса
                  </h2>
                  <p>То, что действительно ценят</p>
                </div>
                <div className='sert__item sert-item'>
                  <picture>
                    <img
                      data-src={`${landFolder}/a3.png`}
                      alt='man'
                      className='lazyload'
                    />
                  </picture>
                  <div className='sert-item__body'>
                    <div></div>
                    <h3>Ткачук Александр</h3>
                    <p>
                      Когда я устраивался на работу, этот сертификат имел
                      большую ценность для работодателей. Как мне сказали,
                      сертификат WillSkill является не только подтверждением
                      моих знаний и навыков, но и показателем того,
                      что я достаточно целеустремлённый и умею доводить дела
                      до конца.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* reviews */}
            <section className={reviewsStyle.reviews} id='reviews'>
              <div className='reviews__head'>
                <p>Все еще сомневаетесь?</p>
                <h2 className='title'>Прочтите отзывы наших учеников</h2>
              </div>
              {isClientSide && (
                <div className='reviews__slider'>
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{
                      el: '.reviews__pagination',
                      type: 'bullets',
                      clickable: true,
                    }}
                    breakpoints={{
                      800: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      1200: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      1500: {
                        slidesPerView: 3,
                        spaceBetween: 95,
                      },
                    }}
                    className='swiper-container reviews__container'
                  >
                    {reviews.map((review, idx) => (
                      <SwiperSlide
                        key={idx.toString()}
                        className='reviews__item review-item'
                      >
                        <div className='review-item__head'>
                          <picture>
                            <img
                              data-src={review.pic}
                              alt={review.name}
                              className='lazyload'
                            />
                          </picture>
                          <div className='review-item__col'>
                            <h4>{review.name}</h4>
                            <p>{review.date}</p>
                          </div>
                        </div>
                        <div className='review-item__body'>
                          <p>{review.text}</p>
                        </div>
                        <div className='review-item__foot'>
                          <div className='review-item__soc review-item__soc--like'>
                            {review.like}
                          </div>
                          <div className='review-item__soc review-item__soc--comm'>
                            {review.comment}
                          </div>
                          <div className='review-item__soc review-item__soc--rep'>
                            {review.repost}
                          </div>
                          <div className='review-item__soc review-item__soc--watch'>
                            {review.watch}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className='swiper-pagination reviews__pagination' />
                </div>
              )}
            </section>
            {/* order-section */}
            <section className={orderStyle.order} id='order-section'>
              <div className='container'>
                {mousePos && (
                  <div className='order__pic'>
                    <picture>
                      <img
                        data-src={`${landFolder}/order-pic.png`}
                        alt='woman'
                        className='lazyload'
                      />
                    </picture>
                    <picture>
                      <img
                        data-src={`${landFolder}/order-bg.svg`}
                        alt='background'
                        className='lazyload'
                      />
                    </picture>

                    <picture
                      style={{
                        transform: `translate(${mousePos?.x / -100}px, ${
                          mousePos?.y / 50
                        }px)`,
                      }}
                    >
                      <img
                        data-src={`${landFolder}/m1.png`}
                        alt='money'
                        className='lazyload'
                      />
                    </picture>
                    <picture
                      style={{
                        transform: `translate(${mousePos?.x / 100}px, ${
                          mousePos?.y / 150
                        }px)`,
                      }}
                    >
                      <img
                        data-src={`${landFolder}/m2.png`}
                        alt='money'
                        className='lazyload'
                      />
                    </picture>
                    <picture
                      style={{
                        transform: `translate(${mousePos?.x / 120}px, ${
                          mousePos?.y / -50
                        }px)`,
                      }}
                    >
                      <img
                        data-src={`${landFolder}/m3.png`}
                        alt='money'
                        className='lazyload'
                      />
                    </picture>
                  </div>
                )}
                <div className='order__col'>
                  <h2 className='title'>
                    Один шаг и за ваш текст готовы платить!
                  </h2>
                  <p>
                    Начните зарабатывать на одной из самых востребованных
                    профессий всего за 1₽
                  </p>
                  <ul>
                    <li>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic11.svg`}
                          alt='callendar'
                          className='lazyload'
                        />
                      </picture>
                      {data && (
                        <FormattedMessage
                          id='weeks'
                          values={{ count: data.modulesCount }}
                          defaultMessage='{count, plural, one {# неделя} few {# недели} many {# недель} other {# недель}}'
                        />
                      )}
                    </li>
                    <li>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic12.svg`}
                          alt='callendar'
                          className='lazyload'
                        />
                      </picture>
                      2 эксперта
                    </li>
                    <li>
                      <picture>
                        <img
                          data-src={`${landFolder}/ic13.svg`}
                          alt='callendar'
                          className='lazyload'
                        />
                      </picture>
                      30 часов практики
                    </li>
                  </ul>
                  {data && !JSON.parse(EXPORT) && (
                    <Form
                      slug={data.slug}
                      nextBlock={data.nextBlock}
                      subscription={data.subscription}
                      accessType={data.accessType}
                    />
                  )}
                  {data && JSON.parse(EXPORT) && (
                    <ExportForm
                      nextBlock={data.nextBlock}
                      subscription={data.subscription}
                    />
                  )}
                </div>
              </div>
            </section>
            {/* faq */}
            <section className={faqStyle.faq} id='faq'>
              <div className='container'>
                <h2 className='title'>Остались вопросы?</h2>
                <div className='faq__list'>
                  <div
                    onClick={() => handleToggle('1')}
                    className={
                      clicked === '1' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Как и когда проходят занятия?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Учитесь как вам удобно и когда удобно, главное, выделяйте
                      на обучение около пяти часов в неделю.
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('2')}
                    className={
                      clicked === '2' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Что от меня требуется, чтобы учиться?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Интерес к копирайтингу, готовность учиться, усердие
                      и компьютер с доступом в интернет. Мы составили программу
                      так, чтобы информация была понятна даже новичкам, никаких
                      специальных знаний не требуется. Будьте готовы осваивать
                      новые программы и инструменты, при этом смотреть
                      видео-уроки вы можете и с телефона, но для выполнения
                      заданий нужен компьютер.
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('3')}
                    className={
                      clicked === '3' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      А если я никогда не занимался копирайтингом, я смогу все
                      освоить?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      При желании все обязательно получится. Наши курсы нужны
                      для того, чтобы вы смогли примерить на себя профессию
                      и понять, насколько она вам близка. В программу обучения
                      мы специально включили практические занятия,
                      чтобы вы могли понять, подходит ли вам эта специальность,
                      или лучше выбрать что-то другое.
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('4')}
                    className={
                      clicked === '4' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Можно ли освоить профессию за полгода?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Да, можно. Однако вам предстоит набираться опыта, поэтому
                      в начале работы рассчитывайте на позиции младшего
                      специалиста или пройдите стажировку. Свои первые статьи
                      вы начнёте писать уже во время обучения.
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('5')}
                    className={
                      clicked === '5' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Вы выдаете сертификат или диплом?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Да, после окончания курса вы получите сертификат,
                      подтверждающий прохождение курса.
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('6')}
                    className={
                      clicked === '6' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Что нужно знать копирайтеру?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Копирайтер должен уметь создавать тексты для бизнеса:
                      рекламный, развлекательный, информационный; коммерческое
                      предложение, статьи для сайта, лендинга, рассылки, посты,
                      PR-статьи. <br />
                      Этот специалист должен разбираться в маркетинге. Следить
                      за трендами, новостями и успешными коллегами из сферы.
                      Изучать целевую аудиторию, для которой пишет текст. Быстро
                      вникать в новую тему, уметь искать информацию,
                      систематизировать её для статьи. <br />
                      Копирайтеру необходимо знать, как искать и упрощать
                      сложную информацию, сделать текст лёгким и интересным.
                      Инструменты для работы: текстовые редакторы, системы
                      аналитики, сервисы для проверки уникальности текста,
                      базово — графические редакторы.
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('7')}
                    className={
                      clicked === '7' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Какие проблемы решает копирайтер?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Копирайтер помогает заказчику продвигать его бизнес
                      и улучшать продажи с помощью грамотно составленного
                      текста. Хороший текст — интересный, с юмором, полезной
                      информацией, налаживает диалог бренда с человеком. Таким
                      образом, копирайтер:
                      <ul>
                        <li>рассказывает о преимуществах и выгодах бренда;</li>
                        <li>
                          повышает лояльность к бренду потенциальных клиентов;
                        </li>
                        <li>
                          побуждает совершить покупку и вернуться для повторной;
                        </li>
                        <li>популяризует бренд;</li>
                        <li>привлекает внимание потенциальной аудитории;</li>
                        <li>
                          придумывает яркие заголовки и запоминающиеся слоганы.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('8')}
                    className={
                      clicked === '8' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Какое образование должно быть у копирайтера?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Копирайтер должен быть эрудированным, грамотным, с хорошим
                      слогом. Для тех, кто решил обучиться этому ремеслу,
                      отлично подойдут онлайн-курсы. В первую очередь,
                      по копирайтингу — с основными принципами в профессии,
                      приёмами написания современного текста и последними
                      трендами. А затем можно можно расширять свои компетенции
                      в копирайтинге, увеличивая чек. Подойдут курсы по:
                      <ul>
                        <li>SEO-продвижению сайтов;</li>
                        <li>Маркетингу;</li>
                        <li>UX-копирайтингу;</li>
                        <li>Психологии (для понимания ЦА);</li>
                        <li>SMM;</li>
                        <li>Редактуре;</li>
                        <li>Сценарному мастерству.</li>
                      </ul>
                      Что касается фундаментального образования, то подойдут
                      такие направления, как «Филология», «Реклама и связи
                      с общественностью», «Журналистика».
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('9')}
                    className={
                      clicked === '9' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Какие книги читать копирайтеру?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Хороший копирайтер — эрудированный человек с широким
                      кругозором. Ему полезно следить за новостями, популярными
                      сообществами в соцсетях и лидерами мнений, чтобы быстро
                      находить темы и составлять контент-планы. <br />
                      Полезно почитать художественную литературу и публицистику;
                      начитанность помогает связно и красиво выражать свои мысли
                      на бумаге.
                      <br />
                      Книги, которые будут полезны копирайтеру и вдохновят:
                      <br />
                      <ul>
                        <li>
                          Нора Галь «Слово живое и мёртвое». Самая известная
                          книга среди пишущих специалистов. В ней — основные
                          принципы красивого письма с примерами.
                        </li>
                        <li>
                          Максим Ильяхов, Людмила Сарычева «Пиши, сокращая:
                          Как создавать сильные тексты» и Максим Ильяхов «Ясно,
                          понятно: Как доносить мысли и убеждать людей с помощью
                          слов». В книгах на реальных статьях и объявлениях
                          рассказывается о том, как писать легко, убедительно
                          и с первого раза доносить свою мысль до читателей.
                        </li>
                        <li>
                          Дмитрий Кот «Копирайтинг. Как не съесть собаку.
                          Создаём тексты которые продают». Автор делится
                          с читателями практическими приёмами по написанию
                          рекламных текстов и заголовков.
                        </li>
                        <li>
                          Николай Кононов «Автор, ножницы, бумага. Как быстро
                          писать впечатляющие тексты. 14 уроков». Пособие учит
                          писать структурированные тексты — с завязкой,
                          кульминацией и развязкой.
                        </li>
                        <li>
                          Джулия Кэмерон «Право писать. Приглашение и приобщение
                          к писательской жизни». Автор — писательница,
                          журналист, драматург и сценарист. Она делится,
                          как побороть страх чистого листа, синдром самозванца
                          и начать писать, если уже давно хочется,
                          но не позволяет внутренний запрет.
                        </li>
                        <li>
                          Денис Каплунов «Контент, маркетинг и рок-н-ролл.
                          Книга-муза для покорения клиентов в интернете». Будет
                          полезна тем, кто ведёт свой блог и соцсети, занимается
                          email-рассылками, пишет статьи и новости. Как не дать
                          заскучать читателю? Как суметь донести ему ценную
                          информацию? Автор рассказывает это живым языком.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('10')}
                    className={
                      clicked === '10' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Куда расти копирайтеру?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Точки роста для тех, кто умеет обращаться со словом:
                      <ul>
                        <li>
                          <span>Маркетинг</span>
                          Большинство копирайтеров и так работают в этой сфере,
                          создавая продающие тексты для бизнеса. Тут вариантов
                          множество: можно пойти в SMM, а затем и выучиться
                          на таргетолога. Развиваться в SEO. Или же стать
                          digital-маркетинг в целом.
                        </li>
                        <li>
                          <span>Дизайн</span>
                          Специалист с навыками вёрстки и дизайна может создать
                          лендинг под ключ, прототип сайта, красиво
                          проиллюстрировать материал. Следовательно, такая
                          работа будет и стоить больше.
                        </li>
                        <li>
                          <span>IT: UX-писатель</span>
                          Это создатель текстов для интерфейсов сайтов,
                          приложений, кнопок, пуш-уведомлений, ботов.
                          Эта профессия — шанс войти в IT-сферу для специалиста
                          из гуманитарных сфер.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    onClick={() => handleToggle('11')}
                    className={
                      clicked === '11' ? 'faq__item active' : 'faq__item'
                    }
                  >
                    <h3 className='faq__question'>
                      Чем копирайтер отличается от журналиста?
                      <span></span>
                    </h3>
                    <div className='faq__answer'>
                      Копирайтер пишет для бизнеса, журналист — для СМИ.
                      <br />
                      <br />
                      Копирайтер должен формулировать свою мысль точнее
                      и короче. Журналисту же позволительны художественные
                      зарисовки, фигуры речи, подробные и красочные описания.
                      <br />
                      <br />
                      Копирайтер пишет на разные темы, в зависимости от заказа.
                      Журналист специализируется на своей теме: на политике,
                      спорте, международных отношениях, науке и т.д. <br />
                      Копирайтер должен писать в самых разных стилях, говорить
                      на языке аудитории. Журналист же должен выработать свой
                      авторский стиль.
                      <br />
                      <br />
                      Одна из задач копирайтера — сформировать нужные заказчику
                      выводы у читателей, побудить их к действию. Журналист
                      предоставляет аудитории возможность сделать вывод
                      самостоятельно.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/* footer */}
          <Footer footerStyle={FooterStyle.BLOCK} />
        </div>
      </Layout>
    </IntlProvider>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['getProductsSlug', productSlug], () =>
    productApi.getProductsSlug(productSlug),
  )
  if (process.env.INTERNALIZATION === 'true') {
    return {
      notFound: true,
    }
  }
  if (process.env.EXPORT === 'true') {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale as string, [
        'common',
        'components.modal',
      ])),
    },
  }
}

interface IFormProps {
  slug: string
  nextBlock: { days: string; price: string } | null
  accessType: number
  subscription?: {
    status: number
    stopReason?: number
    accessType: number
    currentPayment: ICurrentPayment | null
  }
  className?: string
}

// form
const Form: React.FC<IFormProps> = ({
  slug,
  className,
  nextBlock = null,
  subscription,
  accessType,
}) => {
  const router = useRouter()
  const {
    formState: { isValid, errors, isSubmitting },
    register,
    handler,
    handleCurrentPayment,
    status,
  } = useCustomForm({ slug, accessType })

  return (
    <form
      className={classNames('order__form', {
        [className as string]: className,
      })}
      onSubmit={e => {
        e.preventDefault()
        handler()
      }}
    >
      <div className='order__trial'>
        <div className='order__trial-discount'>-99%</div>
        <div className='order__trial-price'>Первая неделя за 1 рубль</div>
      </div>
      {!subscription && (
        <>
          {status === 'unauthenticated' && (
            <div className='order__wrapper'>
              <input
                className='order__text-input'
                placeholder='Ваш E-mail'
                type='email'
                {...register('email', {
                  required: {
                    value: true,
                    message: 'поле должно быть заполнено',
                  },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'введите корректную почту',
                  },
                })}
              />
              {errors?.email?.message && (
                <div className='form__input-error'>
                  {errors?.email?.message}
                </div>
              )}
            </div>
          )}
          <button
            className='checkout__btn order__btn'
            type='submit'
            disabled={!isValid || isSubmitting}
          >
            Начать обучение
          </button>
          <div className='form__item form__item--flex'>
            <div className='checkbox__text order__check-label'>
              Нажимая на кнопку, я соглашаюсь с{' '}
              <a
                href={PRIVACY_POLICY}
                target='_blank'
                rel='noreferrer'
                className='checkbox__link order__link'
              >
                политикой конфиденциальности{' '}
              </a>
              ,{' '}
              <a
                href={PERSONAL_DATA}
                target='_blank'
                rel='noreferrer'
                className='checkbox__link order__link'
              >
                политикой обработки персональных данных{' '}
              </a>
              и{' '}
              <a
                href={OFERTA}
                target='_blank'
                rel='noreferrer'
                className='checkbox__link order__link'
              >
                офертой
              </a>
            </div>
          </div>
        </>
      )}
      <div className='order__wrapper'>
        {subscription && subscription.status !== 1 && (
          <button
            className='checkout__btn order__btn'
            onClick={e => {
              e.preventDefault()
              return router.push(navigateCourse)
            }}
          >
            Продолжить обучение
          </button>
        )}
        {subscription &&
          subscription.status === 1 &&
          subscription.accessType === 1 && (
            <button
              className='checkout__btn order__btn'
              onClick={() => {
                handleCurrentPayment({
                  slug,
                  currentPayment: subscription.currentPayment,
                })
              }}
            >
              Оплатить
            </button>
          )}
        {nextBlock && (
          <div className='form__item form__item--flex'>
            <div className='order__trial-note'>
              Далее <FormattedNumber value={Number(nextBlock.price) / 100} />
              руб. раз в
              <FormattedMessage
                id='day'
                values={{ count: Number(nextBlock.days) }}
                defaultMessage='{count, plural, one {# день} few {# дня} many {# дней} other {# дней}}'
              />
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

const ExportForm: React.FC<Pick<IFormProps, 'nextBlock' | 'subscription'>> = ({
  nextBlock = null,
  subscription,
}) => {
  return (
    <form className={classNames('order__form')}>
      <div className='order__trial'>
        <div className='order__trial-discount'>-99%</div>
        <div className='order__trial-price'>Первая неделя за 1 рубль</div>
      </div>
      {!subscription && (
        <>
          <button className='checkout__btn order__btn'>
            <a>Начать обучение</a>
          </button>
          <div className='form__item form__item--flex'>
            <div className='checkbox__text order__check-label'>
              Нажимая на кнопку, я соглашаюсь с
              <a
                href={PRIVACY_POLICY}
                target='_blank'
                rel='noreferrer'
                className='checkbox__link order__link'
              >
                политикой конфиденциальности
              </a>
              ,
              <a
                href={PERSONAL_DATA}
                target='_blank'
                rel='noreferrer'
                className='checkbox__link order__link'
              >
                политикой обработки персональных данных
              </a>
              и
              <a
                href={OFERTA}
                target='_blank'
                rel='noreferrer'
                className='checkbox__link order__link'
              >
                офертой
              </a>
            </div>
          </div>
        </>
      )}
      <div className='order__wrapper'>
        {nextBlock && (
          <div className='form__item form__item--flex'>
            <div className='order__trial-note'>
              Далее <FormattedNumber value={Number(nextBlock.price) / 100} />
              руб. раз в
              <FormattedMessage
                id='day'
                values={{ count: Number(nextBlock.days) }}
                defaultMessage='{count, plural, one {# день} few {# дня} many {# дней} other {# дней}}'
              />
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

const ProgramAccordion = ({ data }: { data: Product2 }) => {
  const [clicked, setClicked] = React.useState('0')
  const [clicked2, setClicked2] = React.useState(false)
  const handleToggle = (index: string) => {
    if (clicked === index) {
      return setClicked('')
    }
    setClicked(index)
  }

  return (
    <div className='program__body'>
      <div
        className={classNames('program__list', {
          active: clicked2,
        })}
      >
        {data.course.modules.map((module, idx) => (
          <div
            key={idx.toString()}
            className={classNames('program__item programm-item ', {
              active: clicked === idx.toString(),
            })}
          >
            <div className='programm-item__bg'></div>
            <div className='programm-item__head'>
              <h3>{module.title}</h3>
              <span
                className='programm-item__trigger'
                key={idx.toString()}
                onClick={() => handleToggle(idx.toString())}
              ></span>
            </div>
            <div className='programm-item__body'>
              <div className='programm-item__col'>
                <h3>Уроки модуля:</h3>
                <p>+ Домашнее задание</p>
              </div>
              <div className='programm-item__col'>
                <ul>
                  {module.lessons.map((item, idx) => (
                    <li key={idx.toString()}> {item.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className={classNames('program__button', {
          active: clicked2,
        })}
        onClick={() => setClicked2(!clicked2)}
      >
        <picture>
          <img
            data-src={`${landFolder}/plus2.svg`}
            alt='write-mashine'
            className='lazyload'
          />
        </picture>
      </button>
    </div>
  )
}
