import { NextResponse } from 'next/server'

const CREATE_CLUSTER_WEBHOOK_URL =
  process.env.CREATE_CLUSTER_WEBHOOK_URL ||
  'https://hooks.slack.com/triggers/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'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const response = await fetch(CREATE_CLUSTER_WEBHOOK_URL, {
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
