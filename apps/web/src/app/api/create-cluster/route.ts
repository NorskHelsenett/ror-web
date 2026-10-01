import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.CREATE_CLUSTER_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Cluster webhook is not configured' }, { status: 503 })
    }

    const payload = await request.json()
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Webhook request failed' }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send cluster request' }, { status: 500 })
  }
}
