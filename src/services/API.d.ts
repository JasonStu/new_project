declare namespace API {
  export type CurrentUser = {
    token?: string;
    username?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
    user_type:string;

  };

  export type LoginStateType = {
    data?: object;
    code?: '0' | '1';
  };

  export type DashboardHeaderStateType = {
    itemsTotal?: 0,
    inventoryTotal?: 0,
    updatedTotal?: 0,
    publishedTotal?: 0,
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };
}
