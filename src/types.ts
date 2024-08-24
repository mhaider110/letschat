

export interface Message {
	type: 'message-sent' | 'message-received'
	message: string
	timestamp: Date
}

export interface Chat {
	userId: number
	userName: string
	messages: Message[]
}