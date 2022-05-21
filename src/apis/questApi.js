import { post } from "../modules/axios";
import { getCookie } from "../shared/Cookie";
const token = getCookie('token');

export async function postQuest({request, questId, type}) {
  const url = `/api/quests/${questId}?type=${type}`;
  const { data } = await post(url, {...request}, {headers: { Authorization: `Bearer ${token}` }}
  );
  return data;
}