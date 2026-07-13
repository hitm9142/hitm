import { NextResponse } from 'next/server';

// ─── Success ───────────────────────────────────────────────────────────────────

export function successResponse(data, message = 'Success', status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

// ─── Errors ────────────────────────────────────────────────────────────────────

export function errorResponse(message = 'Internal server error', status = 500) {
  return NextResponse.json({ success: false, message }, { status });
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

export function notFoundResponse(message = 'Not found') {
  return NextResponse.json({ success: false, message }, { status: 404 });
}

export function validationError(errors) {
  return NextResponse.json(
    {
      success: false,
      message: 'Validation failed',
      errors,
    },
    { status: 422 }
  );
}
