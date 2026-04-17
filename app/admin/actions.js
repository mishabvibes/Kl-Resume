'use server';

import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function adminLoginAction(username, password) {
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'password123';
  const secretKey = process.env.ADMIN_SECRET || 'fallback-secret-klresume';

  if (username === adminUser && password === adminPass) {
    // 24 hours expiry
    cookies().set('admin_token', secretKey, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 
    });
    return { success: true };
  }
  return { success: false, message: 'Invalid Admin Credentials' };
}

export async function adminLogoutAction() {
  cookies().delete('admin_token');
  redirect('/admin/login');
}

export async function deleteUserAction(id) {
  const secretKey = process.env.ADMIN_SECRET || 'fallback-secret-klresume';
  const token = cookies().get('admin_token');

  if (!token || token.value !== secretKey) {
    throw new Error("Unauthorized");
  }

  await dbConnect();
  await User.findByIdAndDelete(id);
  
  revalidatePath('/admin');
}
