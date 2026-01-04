<template>
  <div class="bg-gray-100 text-gray-800 min-h-screen">
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Job List</h1>

      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Filter by job title"
          class="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
          @keyup.enter="applySearch"
        />
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow rounded-lg">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="py-2 px-4 text-left">ID</th>
              <th class="py-2 px-4 text-left">Job Title</th>
              <th class="py-2 px-4 text-left">Company</th>
              <th class="py-2 px-4 text-left">Description</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="job in jobs"
              :key="job.id"
              class="hover:bg-gray-50"
            >
              <td class="py-2 px-4">{{ job.id }}</td>
              <td class="py-2 px-4 font-medium">{{ job.job_title }}</td>
              <td class="py-2 px-4">{{ job.company }}</td>
              <td class="py-2 px-4 text-sm text-gray-600">
                {{ job.description.slice(0, 120) }}…
              </td>
              <td class="py-2 px-4">
                <button
                  @click="toggleFavourite(job.id)"
                  class="text-2xl transition transform hover:scale-110"
                  :class="favourites.includes(job.id) ? 'text-red-500' : 'text-gray-400'"
                >
                  {{ favourites.includes(job.id) ? '♥' : '♡' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center items-center mt-4 space-x-2">
        <button
          class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          :disabled="currentPage === 0"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>

        <span>Page {{ currentPage + 1 }} of {{ lastPage + 1 }}</span>

        <button
          class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          :disabled="currentPage >= lastPage"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const jobs = ref([])
const search = ref('')
const favourites = ref([])

const currentPage = ref(0) // API pages start at 0
const lastPage = ref(0)

async function fetchJobs(page = 0) {
  if (search.value) {
    const res = await fetch(
      '/jobs/recommendations',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle: search.value })
      }
    )
    const recommendedJson = await res.json()
    const recommendedIds = recommendedJson.jobIds

    const detailedJobs = await Promise.all(
      recommendedIds.map(async (id) => {
        const r = await fetch(`/jobs/${id}`)
        return await r.json()
      })
    )

    jobs.value = detailedJobs
    currentPage.value = 0
    lastPage.value = 0
    return
  }

  const res = await fetch(`/jobs?page=${page}`)
  const json = await res.json()
  jobs.value = json.data
  currentPage.value = json.pagination.currentPage
  lastPage.value = json.pagination.lastPage
}

async function loadFavourites() {
  const res = await fetch(`/favourites/1`) // example user
  const json = await res.json()
  favourites.value = json.jobIds
}

async function toggleFavourite(jobId) {
  const isFav = favourites.value.includes(jobId)
  const method = isFav ? 'DELETE' : 'POST'

  try {
    await fetch('/favourites', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, jobId })
    })

    if (isFav) {
      favourites.value = favourites.value.filter(id => id !== jobId)
    } else {
      favourites.value.push(jobId)
    }

  } catch (err) {
    console.error('Failed to toggle favourite', err)
  }
}

function changePage(page) {
  if (page < 0 || page > lastPage.value) return
  currentPage.value = page
  fetchJobs(page)
}

function applySearch() {
  fetchJobs(0)
}

onMounted(async () => {
  await fetchJobs()
  await loadFavourites()
})
</script>
