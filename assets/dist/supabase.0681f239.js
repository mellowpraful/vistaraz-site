/**
 * Vistaraz Supabase Integration Module
 * Project: gofbwewcncdcyyxbnuuo
 */

const SUPABASE_CONFIG = {
  url: 'https://gofbwewcncdcyyxbnuuo.supabase.co',
  anonKey: window.VISTARAZ_SUPABASE_KEY || 'sb_publishable_aS-QJGiL3jI_buqWQbFk2A_yhmZMkQx'
};

// Initialize Supabase Client if library is available
let supabase = null;
if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
  supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
} else {
  console.warn('Supabase SDK not loaded yet. Make sure to include @supabase/supabase-js in your HTML head.');
}

/**
 * Authentication Service
 */
const VistarazAuth = {
  // Sign up with Email and Password
  async signUp(email, password, metadata = {}) {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } };
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.fullName || '',
          nickname: metadata.nickname || 'Friend',
          role: metadata.role || 'user',
          avatar_url: metadata.avatarUrl || '🦊',
          qualification: metadata.qualification || null,
          languages: metadata.languages || ['English']
        }
      }
    });
  },

  // Sign in with Email and Password
  async signIn(email, password) {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } };
    try {
      return await supabase.auth.signInWithPassword({ email, password });
    } catch (error) {
      return { error: { message: error.message || 'Unable to sign in right now' } };
    }
  },

  // Sign out
  async signOut() {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } };
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = 'index.html';
    }
    return { error };
  },

  // Get current active session user
  async getUser() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Get user profile details
  async getProfile(userId) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  },

  // Listen to Auth State Changes
  onAuthStateChange(callback) {
    if (!supabase) return null;
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
};

/**
 * Database Services
 */
const VistarazDB = {
  // Save assessment result
  async saveAssessment({ score, category, answers = {}, notes = '' }) {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } };
    const user = await VistarazAuth.getUser();
    return await supabase.from('assessments').insert([{
      user_id: user ? user.id : null,
      score,
      category,
      answers,
      notes,
      created_at: new Date().toISOString()
    }]);
  },

  // Update counselor availability
  async updateCounselorStatus(isOnline) {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } };
    const user = await VistarazAuth.getUser();
    if (!user) return { error: { message: 'Must be logged in to update status' } };

    return await supabase.from('counselor_schedules').upsert({
      counselor_id: user.id,
      is_online: isOnline,
      last_active: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, { onConflict: 'counselor_id' });
  },

  // Update counselor schedule
  async saveCounselorSchedule({ startTime, endTime, activeDays, maxDailySessions }) {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } };
    const user = await VistarazAuth.getUser();
    if (!user) return { error: { message: 'Must be logged in' } };

    return await supabase.from('counselor_schedules').upsert({
      counselor_id: user.id,
      start_time: startTime,
      end_time: endTime,
      active_days: activeDays,
      max_daily_sessions: maxDailySessions,
      updated_at: new Date().toISOString()
    }, { onConflict: 'counselor_id' });
  },

  // Submit contact message
  async submitContactMessage({ name, email, subject, message }) {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } };
    return await supabase.from('contact_messages').insert([{
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString()
    }]);
  }
};

// Export to global scope
window.VistarazAuth = VistarazAuth;
window.VistarazDB = VistarazDB;
