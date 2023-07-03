export interface DataHandlerSubmit {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface ResultGetConversations {
  result: DataConversation[];
}

export interface DataDisplayEachMessages {
  result: Message[];
}

export interface DataGetMessages {
  result: Message[];
}

export interface DataGetUsers {
    results: User[];
  }

export interface DataConversation {
  id: number;
  last_message_id: number;
  message: Message;
  userOneAsId: User;
  userOneId: number;
  userTwoAsId: User;
  userTwoId: number;
}

export interface Message {
  id: number;
  content: string;
  date: string;
  conversationId: number;
  userId: number;
  new: boolean;
  user: User;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  status: boolean;
}
