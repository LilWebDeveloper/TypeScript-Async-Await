const container = document.querySelector('.result')! as HTMLTableElement;
const renderTable = async () => {
    const usersURL: string = 'http://localhost:3500/users';
    const companiesURL: string = 'http://localhost:3500/companies';
    const userData: Response = await fetch(usersURL);
    const companiesData: Response = await fetch(companiesURL);
    interface CompanyUser{
        company: string;
    };
    interface ListUser extends ListCompany{
        email: string;
        uris: CompanyUser;
    };
    const userList: Array<ListUser> = await userData.json();
    interface ListCompany{
        name: string;
        uri: string;
    };
    const compList: Array<ListCompany> = await companiesData.json();
    let template: string;
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
        };
        container.innerHTML = template;
    
        console.log(compList)
};
window.addEventListener("DOMContentLoaded", () => renderTable());