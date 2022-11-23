export interface ITodosState {
  data: ITodos[] | null,
  loading: boolean,
}

export interface ITodos {
  "userId": number;
  "id": number;
  "title": string;
  "completed": boolean;
}