import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/context'

type Category = 'audio' | 'wearables' | 'accessories'

type Product = {
  id: string
  name: string
  price: number
  category: Category
  emoji: string
  color: string
}

const PRODUCTS: Product[] = [
  { id: 'headphones', name: 'Aurora Headphones', price: 199, category: 'audio', emoji: '🎧', color: '#6d5efc' },
  { id: 'watch', name: 'Nord Watch', price: 249, category: 'wearables', emoji: '⌚', color: '#0ea5e9' },
  { id: 'speaker', name: 'Orbit Speaker', price: 129, category: 'audio', emoji: '🔊', color: '#a855f7' },
  { id: 'band', name: 'Pulse Band', price: 89, category: 'wearables', emoji: '📿', color: '#22c55e' },
  { id: 'case', name: 'Nord Case', price: 39, category: 'accessories', emoji: '🎒', color: '#f97316' },
  { id: 'mic', name: 'Studio Mic', price: 159, category: 'audio', emoji: '🎙️', color: '#ec4899' },
]

const copy = {
  ru: {
    all: 'Все',
    audio: 'Аудио',
    wearables: 'Гаджеты',
    accessories: 'Аксессуары',
    sort: 'Сортировка',
    popular: 'По популярности',
    priceAsc: 'Сначала дешевле',
    priceDesc: 'Сначала дороже',
    add: 'Добавить в корзину',
    cart: 'Корзина',
    empty: 'Пока пусто — добавь что-нибудь.',
    total: 'Итого',
    checkout: 'Оформить заказ',
    success: 'Заказ оформлен! Спасибо за покупку.',
    more: 'Продолжить покупки',
    items: (n: number) => `${n} шт.`,
  },
  en: {
    all: 'All',
    audio: 'Audio',
    wearables: 'Wearables',
    accessories: 'Accessories',
    sort: 'Sort',
    popular: 'Most popular',
    priceAsc: 'Price: low to high',
    priceDesc: 'Price: high to low',
    add: 'Add to cart',
    cart: 'Cart',
    empty: 'Nothing here yet — add something.',
    total: 'Total',
    checkout: 'Checkout',
    success: 'Order placed! Thanks for shopping.',
    more: 'Continue shopping',
    items: (n: number) => `${n} item${n === 1 ? '' : 's'}`,
  },
}

const CATEGORIES: Category[] = ['audio', 'wearables', 'accessories']

export function StoreDemo() {
  const { language } = useLanguage()
  const t = copy[language]
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState<'popular' | 'price-asc' | 'price-desc'>('popular')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [placed, setPlaced] = useState(false)

  const visible = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => category === 'all' || product.category === category)
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [category, sort])

  const cartItems = PRODUCTS.filter((product) => cart[product.id])
  const total = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)

  const add = (id: string) => {
    setPlaced(false)
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
  }

  const change = (id: string, delta: number) => {
    setCart((current) => {
      const next = { ...current }
      const quantity = (next[id] ?? 0) + delta
      if (quantity <= 0) delete next[id]
      else next[id] = quantity
      return next
    })
  }

  const checkout = () => {
    if (count === 0) return
    setCart({})
    setPlaced(true)
  }

  return (
    <div className="demo-store">
      <div>
        <div className="demo-toolbar">
          <div className="demo-chips">
            <button
              type="button"
              className={`demo-chip ${category === 'all' ? 'is-active' : ''}`}
              onClick={() => setCategory('all')}
            >
              {t.all}
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={`demo-chip ${category === item ? 'is-active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {t[item]}
              </button>
            ))}
          </div>

          <label className="demo-sort">
            <span className="sr-only">{t.sort}</span>
            <select
              className="demo-select"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as 'popular' | 'price-asc' | 'price-desc')
              }
            >
              <option value="popular">{t.popular}</option>
              <option value="price-asc">{t.priceAsc}</option>
              <option value="price-desc">{t.priceDesc}</option>
            </select>
          </label>
        </div>

        <div className="demo-products">
          {visible.map((product) => (
            <article className="demo-product" key={product.id}>
              <span
                className="demo-product__thumb"
                style={{ background: `linear-gradient(135deg, ${product.color}33, ${product.color}11)` }}
                aria-hidden="true"
              >
                {product.emoji}
              </span>
              <div className="demo-product__info">
                <p className="demo-product__name">{product.name}</p>
                <p className="demo-product__cat">{t[product.category]}</p>
                <p className="demo-product__price">${product.price}</p>
              </div>
              <button
                type="button"
                className="demo-add"
                onClick={() => add(product.id)}
                aria-label={`${t.add}: ${product.name}`}
                title={t.add}
              >
                +
              </button>
            </article>
          ))}
        </div>
      </div>

      <aside className="demo-cart">
        <h3>
          {t.cart} {count > 0 && <span className="demo-cart__count">{count}</span>}
        </h3>

        {cartItems.length === 0 ? (
          <p className="demo-cart__empty">{t.empty}</p>
        ) : (
          <ul className="demo-cart__list">
            {cartItems.map((product) => (
              <li className="demo-cart__item" key={product.id}>
                <span className="demo-cart__name">{product.name}</span>
                <span className="demo-qty">
                  <button type="button" onClick={() => change(product.id, -1)} aria-label="−">
                    −
                  </button>
                  {cart[product.id]}
                  <button type="button" onClick={() => change(product.id, 1)} aria-label="+">
                    +
                  </button>
                </span>
                <b>${product.price * cart[product.id]}</b>
              </li>
            ))}
          </ul>
        )}

        <div className="demo-cart__total">
          <span>{t.total}</span>
          <span>${total}</span>
        </div>

        <button type="button" className="demo-checkout" onClick={checkout} disabled={count === 0}>
          {t.checkout}
        </button>

        {placed && (
          <div className="demo-success">
            <p>{t.success}</p>
            <button type="button" className="demo-success__btn" onClick={() => setPlaced(false)}>
              {t.more}
            </button>
          </div>
        )}

        <p className="demo-cart__hint">{t.items(count)}</p>
      </aside>
    </div>
  )
}
