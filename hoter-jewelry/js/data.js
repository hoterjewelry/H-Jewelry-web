/* Loads content/projects.json. This is the file your client edits (or, later,
   the file a CMS writes to) when adding a new piece of work. */
async function loadProjects() {
  try {
    const res = await fetch('content/projects.json');
    if (!res.ok) throw new Error('Failed to load projects.json');
    return await res.json();
  } catch (err) {
    console.error('Could not load project data:', err);
    return [];
  }
}
