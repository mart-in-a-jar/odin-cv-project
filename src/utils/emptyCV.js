import avatar from "../img/avatar.png";
import { v4 as uuid } from "uuid";
const thisYear = new Date().getFullYear();

const emptyCV = {
    personalia: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        photo: avatar,
    },
    experience: [
        {
            id: uuid(),
            from: {
                month: 1,
                year: thisYear,
            },
            to: {
                month: 1,
                year: thisYear,
            },
            role: "",
            company: "",
            description: "",
        },
    ],
    education: [
        {
            id: uuid(),
            from: {
                month: 1,
                year: thisYear,
            },
            to: {
                month: 1,
                year: thisYear,
            },
            degree: "",
            school: "",
        },
    ],
};

export default emptyCV;
