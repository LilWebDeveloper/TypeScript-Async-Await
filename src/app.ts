interface CompanyUser{
    company: string;
}
interface Company{
    name: string;
    uri: string;
}
interface User extends Company{
    email: string;
    uris: CompanyUser;
}
const container = document.querySelector('.result')! as HTMLTableElement;
async function renderTable(): Promise<void> {
    const usersURL: string = 'http://localhost:3500/users';
    const userData: Response = await fetch(usersURL);
    const user: User[] = await userData.json();
    const companiesURL: string = 'http://localhost:3500/companies';
    const companiesData: Response = await fetch(companiesURL);
    const companies: Company[] = await companiesData.json();
    let template: string;
    template = '';
        for(var i of companies){
            template += '<tr><td>' + i.name + '</td><td>';
            for(var j of user){
                if(j.uris.company === i.uri){
                    template += j.name + '<br>';
                }
            }
            template += "</td></tr>";
        };
        container.innerHTML = template;
};
window.addEventListener("DOMContentLoaded", () => renderTable());