import { post } from "../modules/axios";

export async function postQuest({request, questId, type}) {
  const url = `/api/quests/${questId}?type=${type}`;
  const { data } = await post(url, {
    ...request,
  });
  return data;
}