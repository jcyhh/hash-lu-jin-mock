import { post } from '@/utils/request'

export const submitRecharge = (data: { tx_id: string; amount: string | number }) => post('/api/recharges', data)
