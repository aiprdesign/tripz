/**
 * User profile options for personalized safety and attitude info per country.
 * Stored in localStorage; optional (user can skip or choose "Prefer not to say").
 */

export const PROFILE_STORAGE_KEY = 'travel-planner-user-profile'

export const RACE_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'Black', label: 'Black' },
  { value: 'East Asian', label: 'East Asian' },
  { value: 'South Asian', label: 'South Asian' },
  { value: 'Southeast Asian', label: 'Southeast Asian' },
  { value: 'Middle Eastern', label: 'Middle Eastern' },
  { value: 'North African', label: 'North African' },
  { value: 'Latin American', label: 'Latin American' },
  { value: 'White', label: 'White' },
  { value: 'Mixed', label: 'Mixed / multiracial' },
  { value: 'Other', label: 'Other' },
]

export const AGE_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: '18-24', label: '18–24' },
  { value: '25-34', label: '25–34' },
  { value: '35-49', label: '35–49' },
  { value: '50-64', label: '50–64' },
  { value: '65+', label: '65+' },
]

export const GENDER_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'Woman', label: 'Woman' },
  { value: 'Man', label: 'Man' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Other', label: 'Other' },
]

const defaultProfile = () => ({ race: '', age: '', gender: '' })

export function loadUserProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) return defaultProfile()
    const p = JSON.parse(raw)
    return {
      race: typeof p.race === 'string' ? p.race : '',
      age: typeof p.age === 'string' ? p.age : '',
      gender: typeof p.gender === 'string' ? p.gender : '',
    }
  } catch {
    return defaultProfile()
  }
}

export function saveUserProfile(profile) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  } catch {}
}
