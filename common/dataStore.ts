type FoodItem = {
	id: string | number
	name: string
	price: number
	category: string
	description: string
	image: string
}

type CartMap = Record<string, number>

type OrderItem = {
	id: string | number
	name: string
	qty: number
	price: number
}

type Order = {
	id: string
	time: string
	status: string
	items: OrderItem[]
}

const K_FOODS = 'pf_foods'
const K_CART = 'pf_cart'
const K_ORDERS = 'pf_orders'
const K_ORDER_SUCCESS = 'pf_order_success'

export function loadFoods(fallback: FoodItem[] = []): FoodItem[] {
	const v = uni.getStorageSync(K_FOODS)
	return (v && Array.isArray(v) ? v : fallback) as FoodItem[]
}

export function ensureFoods(fallback: FoodItem[] = []): FoodItem[] {
	const v = uni.getStorageSync(K_FOODS)
	if (v && Array.isArray(v) && v.length > 0) return v as FoodItem[]
	if (fallback && fallback.length > 0) {
		uni.setStorageSync(K_FOODS, fallback)
		return fallback
	}
	return []
}

export function saveFoods(foods: FoodItem[]) {
	uni.setStorageSync(K_FOODS, foods)
}

export function loadCart(): CartMap {
	const v = uni.getStorageSync(K_CART)
	return (v && typeof v === 'object' ? v : {}) as CartMap
}

export function saveCart(cart: CartMap) {
	uni.setStorageSync(K_CART, cart)
}

export function clearCart() {
	uni.removeStorageSync(K_CART)
}

export function loadOrders(): Order[] {
	const v = uni.getStorageSync(K_ORDERS)
	return (v && Array.isArray(v) ? v : []) as Order[]
}

export function saveOrders(orders: Order[]) {
	uni.setStorageSync(K_ORDERS, orders)
}

export function setOrderSuccessFlag(message: string) {
	uni.setStorageSync(K_ORDER_SUCCESS, message)
}

export function consumeOrderSuccessFlag(): string {
	const v = uni.getStorageSync(K_ORDER_SUCCESS) || ''
	if (v) uni.removeStorageSync(K_ORDER_SUCCESS)
	return String(v)
}

export function nowTimeString() {
	const d = new Date()
	const pad = (n: number) => String(n).padStart(2, '0')
	return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(
		d.getMinutes()
	)}`
}

export function uuid() {
	return `${Date.now()}_${Math.floor(Math.random() * 1e9)}`
}

