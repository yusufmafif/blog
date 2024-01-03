
import Stripe from "stripe";
import { headers } from "next/headers";
import { createSupabaseAdmin } from "@/lib/supabase/index";
import { buffer } from "stream/consumers";

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);
const endpointSecret = process.env.ENDPOINT_SECRET!;


export async function POST(req: any) {
    const rawBody = await buffer(req.body);
    let event;
    try {
        const sig = headers().get('stripe-signature');
        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch (err: any) {
        return Response.json({ error: 'Webhook error' + err.message });
    }

    switch (event.type) {
        case 'customer.updated':
            const customer = event.data.object;
            const subscription = await stripe.subscriptions.list({
                customer: customer.id,
            })
            if (subscription.data.length) {
                const sub = subscription.data[0]
                const { error } = await onSuccessSubscription(
                    sub.id,
                    customer.id,
                    sub.status === "active",
                    customer.email!,
                )
                if (error?.message) {
                    return Response.json({ error: "Unable to do subscription" + error.message })
                }
            }
            break;
        case 'customer.subscription.deleted':
            const deleteSub = event.data.object;
            const { error } = await onCancelSubscription(false, deleteSub.id)
            if (error?.message) {
                return Response.json({ error: "Fail to cancel subscription" + error.message })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    return Response.json({});
}


const onCancelSubscription = async (
    subscription_status: boolean,
    sub_id: string
) => {
    const supabaseAdmin = await createSupabaseAdmin();
    return await supabaseAdmin.from('users').update({
        subscription_status,
        stripe_subscription_id: null,
        stripe_customer_id: null,
    }).eq('stripe_subscription_id', sub_id)
}


const onSuccessSubscription = async (
    stripe_subscription_id: string,
    stripe_customer_id: string,
    subscription_status: boolean,
    email: string) => {

    const supabaseAdmin = await createSupabaseAdmin();
    return await supabaseAdmin
        .from('users')
        .update({
            subscription_status,
            stripe_subscription_id,
            stripe_customer_id,
        })
        .eq("email", email)
}

