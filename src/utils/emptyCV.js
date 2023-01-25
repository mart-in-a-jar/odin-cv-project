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
            fromMonth: 1,
            fromYear: thisYear,
            toMonth: 1,
            toYear: thisYear,
            role: "",
            company: "",
            description: "",
        },
    ],
    education: [
        {
            id: uuid(),
            from: {
                month: "",
                year: "",
            },
            to: {
                month: "",
                year: "",
            },
            degree: "",
            school: "",
        },
    ],
};

export default emptyCV;
