import { loginFormType } from "@/app/auth/login/schemas/login.schema";
import { api } from "@/lib/api.config";
import { User } from "@/types/user.type";
import { create } from "zustand";
import Cookies from "js-cookie";

export type States = {
  token?: string | null;
  user?: User | null;
  isPending: boolean;
};

export type Actions = {
  login(data: loginFormType): Promise<void>;
  getUser(): Promise<void>;
  logout(): void;
  initAuth(): Promise<void>;
};

export const useAuthStore = create<States & Actions>((set, get) => ({
  token: null,
  user: null,
  isPending: true,

  async login(data) {
    const response = await api.post<{
      data: { access_token: string; user: User };
    }>("/auth/login", data);

    if (response.data) {
      const { access_token, user } = response.data.data;

      console.log(response.data);

      // Salva o token no cookie
      Cookies.set("jcwpp_access_token", access_token); // Expires in 7 days, ajustável

      // Atualiza o header
      api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      set(() => ({ user, token: access_token, isPending: false }));
    }
  },

  async getUser() {
    try {
      const response = await api.get<{ data: User }>("/users/user-logged");
      set({ user: response.data.data, isPending: false });
    } catch {
      get().logout(); // Se der erro (ex: 401), faz logout
    }
  },

  logout() {
    Cookies.remove("jcwpp_access_token");
    delete api.defaults.headers.common.Authorization;
    set({ token: null, user: null, isPending: false });
  },

  async initAuth() {
    const token = Cookies.get("jcwpp_access_token");

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      set({ token });

      await get().getUser();
      return;
    }

    set({ isPending: false });
  },
}));
