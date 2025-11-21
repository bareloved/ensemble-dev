import { createClient } from "@/lib/supabase/client";

/**
 * Validate avatar file before upload
 * Checks file type and size
 */
export function validateAvatarFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB. Please upload a smaller image.',
    };
  }

  return { valid: true };
}

/**
 * Upload avatar to Supabase Storage
 * Returns the public URL of the uploaded avatar
 */
export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const supabase = createClient();

  // Validate file first
  const validation = validateAvatarFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Get file extension
  const fileExt = file.name.split('.').pop();
  const fileName = `avatar.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Delete old avatar if it exists (to prevent accumulating old files)
  try {
    await deleteAvatar(userId);
  } catch (error) {
    // Ignore errors if no old avatar exists
    if (process.env.NODE_ENV === 'development') {
      console.log('No old avatar to delete or error deleting:', error);
    }
  }

  // Upload new avatar
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true, // Replace if exists
    });

  if (uploadError) {
    throw new Error(`Failed to upload avatar: ${uploadError.message}`);
  }

  // Get public URL
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Delete avatar from Supabase Storage
 */
export async function deleteAvatar(userId: string): Promise<void> {
  const supabase = createClient();

  // List all files in the user's folder
  const { data: files, error: listError } = await supabase.storage
    .from('avatars')
    .list(userId);

  if (listError) {
    throw new Error(`Failed to list avatars: ${listError.message}`);
  }

  if (!files || files.length === 0) {
    return; // No files to delete
  }

  // Delete all files in the user's folder
  const filePaths = files.map((file) => `${userId}/${file.name}`);
  const { error: deleteError } = await supabase.storage
    .from('avatars')
    .remove(filePaths);

  if (deleteError) {
    throw new Error(`Failed to delete avatar: ${deleteError.message}`);
  }
}

/**
 * Get public URL for an avatar path
 */
export function getAvatarUrl(path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(path);
  
  return data.publicUrl;
}

/**
 * Get user initials from name for avatar fallback
 */
export function getUserInitials(name: string | null): string {
  if (!name) return '?';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

