import { User } from "../state/auth/types";
import { Note } from "../state/notes/types";

export type GET = {
  "/api/v1/notes": {
    req: {
      vars?: {};
      params?: {};
    };
    res: { notes: Note[] };
  };
  "/api/v1/notes/:id": {
    req: {
      vars: { id: string };
      params?: {};
    };
    res: Note;
  };
};

export type POST = {
  "/api/v1/login": {
    req: {
      vars?: {};
      params?: {};
      body: {
        username: string;
        password: string;
      };
    };
    res: User;
  };
  "/api/v1/logout": {
    req: {
      vars?: {};
      params?: {};
      body?: {};
    };
    res: {};
  };
  "/api/v1/users": {
    req: {
      vars?: {};
      params?: {};
      body: {
        username: string;
        email: string;
        password: string;
      };
    };
    res: User;
  };
  "/api/v1/notes": {
    req: {
      vars?: {};
      params?: {};
      body: {
        title: string;
        content: string;
      };
    };
    res: Note;
  };
};

export type PATCH = {
  "/api/v1/notes/:id": {
    req: {
      vars: {
        id: string;
      };
      params?: {};
      body: {
        title: string;
        content: string;
        version: number;
      };
    };
    res: Note;
  };
};

export type DELETE = {
  "/api/v1/notes/:id": {
    req: {
      vars: { id: string };
      params?: {};
      body?: {};
    };
  };
};
