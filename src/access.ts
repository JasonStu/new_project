// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  let canSourcing = false
  let canEngineering = false
  if (currentUser && currentUser.user_type === 'Admin') {
    canSourcing = true
    canEngineering = true
  }

  if (currentUser && currentUser.user_type === 'Sourcing') {
    canSourcing = true
  }

  if (currentUser && currentUser.user_type === 'Qc/Engineering') {
    canEngineering = true
  }

  return {
    canAdmin: currentUser && currentUser.user_type === 'Admin',
    Sourcing: canSourcing,
    Engineering: canEngineering,

  };
}
