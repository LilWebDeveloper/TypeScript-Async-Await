interface CompanyUser{
    company: string;
};
interface ListCompany{
    name: string;
    uri: string;
};
interface ListUser extends ListCompany{
    email: string;
    uris: CompanyUser;
};

const container = document.querySelector('.result')! as HTMLTableElement;
async function renderTable(): Promise<void> {
    const usersURL: string = 'http://localhost:3500/users';
    const userData: Response = await fetch(usersURL);
    const userList: ListUser[] = await userData.json();
    const companiesURL: string = 'http://localhost:3500/companies';
    const companiesData: Response = await fetch(companiesURL);
    const compList: ListCompany[] = await companiesData.json();
    let template: string;
    template = '';
        for(var i of compList){
            template += '<tr><td>' + i.name + '</td><td>';
            for(var j of userList){
                if(j.uris.company === i.uri){
                    template += j.name + '<br>';
                }
            }
            template += "</td></tr>";
        };
        container.innerHTML = template;
};
window.addEventListener("DOMContentLoaded", () => renderTable());