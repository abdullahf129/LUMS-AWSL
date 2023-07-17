export interface createMember {
    name: string;
    email: string;
    departmentId: number;    
}

export interface deleteMember {
    id: number;
}

export interface updateMember {
    name: string;
    id: number;
    email: string;
    departmentId: number;
}

export interface loginMember {
    email: string;
    password: string;
}