<template>
    <div>
        <sidenav :stationid="this.$route.query.id"></sidenav>
        <div class="main-install overview-inst">
            <h2>Picture of the installation</h2>
            <div>
                <div class="image-container">
                    <img :src="'http://localhost:8080/storage/images/'+image_path" alt="" width="200px" height="200px">
                    
                </div>
                <div class="image-input">
                    <div class="flex-container">
                        <input type="file" id="fileInput" />
                        <button type="submit">Update installation image</button>
                    </div>

                </div>
            </div>
            <h2>Manage</h2>
            <div>
                <label for="nameInput">Installation name : </label>
                <input type="text" name="nameInput" id="nameInput" v-model="installation.name">
                <button type="submit">Apply</button>
            </div>
            <h2>Maintenance</h2>
            <div>
                <p>
                    System installation date : <br>
                    Last human intervention : <br>
                    Next uman intervention : 
                </p>
                <button type="submit">Register new human intervention</button>
            </div>
            <h2>Contacts</h2>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>E-mail</th>
                    <th>Role</th>
                    <th>Edit</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            

        </div>
    </div>
</template>

<script>
import Sidenav from '../template/Sidenav'
import API from '../../http-constants'
import PictureInput from 'vue-picture-input'

    export default {
        name: 'Manage',
        components : {
            Sidenav,
            PictureInput
        },
        data(){
            return{
                installation :'',
                installationId : this.$route.query.id,
                image_path : 'default_image.png',
                image:'',
                errorMessage : ''
            }
        },
        created() {
            this.getInstallation();
        },
        methods: {
            getInstallation: function () {
                API.get('/api/installation/'+this.installationId)
                    .then(response => {
                        this.installation = response.data
                        this.image_path = this.installation.image_path
                    })
                    .catch(e => {
                        this.errorMessage = e
                    })
                },
            },
        onChanged (image) {
            if (image) {
                this.image = this.$refs.pictureInput.file
                
            }
        }
        }
</script>