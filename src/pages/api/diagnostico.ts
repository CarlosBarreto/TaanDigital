// src/pages/api/diagnostico.ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
    let formData;

    console.log(request.headers.get('content-type'));

    try {
        formData = await request.formData();
    } catch (err) {
        return new Response('Formato de formulario inválido', { status: 400 });
    }

    const nombre = formData.get('nombre')?.toString();
    const email = formData.get('email')?.toString();
    const negocio = formData.get('negocio')?.toString();

    // Validación mínima
    if (!nombre || !email || !negocio) {
        return new Response('Datos incompletos', { status: 400 });
    }

    /**
     * MVP: crear session_id simple
     * (mañana esto puede venir de DB / UUID / JWT)
     */
    const sessionId = crypto.randomUUID();

    /**
     * Aquí puedes:
     * - Guardar en DB
     * - Enviar a webhook
     * - Inicializar contexto de DECODER
     * - Disparar evento
     */

    console.log('Nueva sesión diagnóstico:', {
        sessionId,
        nombre,
        email,
        negocio
    });

    // Redirigir a pantalla de transición
    return redirect(`/diagnostico/decoder?sid=${sessionId}`, 303);
};