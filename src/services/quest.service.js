import api from "../modules/api"

export async function postQuest({ request, questId, type }) {
  const url = `/api/quests/${questId}?type=${type}`
  const { data } = await api.post(url, { ...request })
  return data
}
