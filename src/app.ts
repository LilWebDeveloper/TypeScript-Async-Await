const container: Element = document.querySelector('.result')!;

const renderTable = async () => {
    const usersURL: string = 'http://localhost:3500/users';
    const companiesURL: string = 'http://localhost:3500/companies';
    const userData: Response = await fetch(usersURL);
    const companiesData: Response = await fetch(companiesURL);

    interface CompanyUser{
        company: string
    }
    interface ListUser{
        email: string;
        name: string;
        uri: string;
        uris: CompanyUser
    }
    const userList: ListUser[] = await userData.json();
    interface ListCompany{
        name: string;
        uri: string
    }
    const compList: ListCompany[] = await companiesData.json();
    let template: string
    template = '';
        for(var i of compList){
            template += '<tr><td>';
            template += i.name;
            template += '</td><td>';
            for(var j of userList){
                if(j.uris.company === i.uri){
                    template += j.name + '<br>';
                }
            }
            template += "</td></tr>";
        }
        container.innerHTML = template;
    
};
window.addEventListener("DOMContentLoaded", () => renderTable());