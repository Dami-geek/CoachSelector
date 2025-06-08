<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import cookies from 'vue-cookies'

function checkCookie(requireRole = 'any') {
    const token = cookies.get('cs-ssid');
    let promise = new Promise((resolve, reject) => {
        if(token==null||token==undefined||token==''){
            reject({ code: 400, message: 'Not logged in' });
        }else{
            axios.get(backendurl+'/verify/'+token).then(res => {
                if(res.data.status == 'success'){
                    if(res.data.role!=requireRole && requireRole!='any'){
                        reject({ code: 403, message: 'Forbidden' });
                        return;
                    }
                    resolve(res.data);
                } else {
                    cookies.remove('cs-ssid');
                    reject({ code: 401, message: 'Invalid token' });
                }
            }).catch(err => {
                reject({ code: 500, message: 'Server error' });
            });
        }
    });
    return promise;
}

const backendurl ='http://localhost:8080/api';

export default
{
    backendurl,
    checkCookie
}
</script>