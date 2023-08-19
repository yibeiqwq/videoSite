type Gender = 'male' | 'female';

export type Friend = {
  id: number;
  /** 备注 */
  remark: string;
  user_id: number;
  user: {
    id: number;
    code: number;
    nickname: string;
    avatar: string;
    /** 性别 */
    gender: Gender;
  };
};

export type Group = {
  id: number;
  code: number;
  /** 群名 */
  name: string;
  /** 成员人数 */
  member_count: number;
  /** 人数上限 */
  allow_member_count: number;
  member: {
    id: number;
    /** 在群内昵称 */
    nickname: string;
    user: {
      id: number;
      code: number;
      nickname: string;
      avatar: string;
      gender: Gender;
    };
    /** 在群内角色 */
    role: number;
    /** 在群内等级 */
    level: number;
    /** 用户设置的群名备注 */
    remark: string;
    /** 是否免打扰 */
    is_dnd: true;
    /** 是否被禁言 */
    is_banned: true;
    /** 群创建时间 */
    created_time: number;
  };
};
