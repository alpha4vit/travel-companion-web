
export class DateConverter{
    static convertDateSimple = (date) => {
        const instantDate = new Date(date);
        const day = String(instantDate.getDate()).padStart(2, '0');
        const month = String(instantDate.getMonth() + 1).padStart(2, '0');
        const year = instantDate.getFullYear();

        return `${day}/${month}/${year}`;
    }

    static convertDateFull = (date) => {
        const instantDate = new Date(date);
        const day = instantDate.getDate().toString().padStart(2, '0');
        const month = (instantDate.getMonth() + 1).toString().padStart(2, '0');
        const year = instantDate.getFullYear();
        const hours = instantDate.getHours().toString().padStart(2, '0');
        const minutes = instantDate.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
}