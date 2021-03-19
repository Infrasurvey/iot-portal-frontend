<template>
    <div>
        <sidenav :stationid="this.$route.query.id"></sidenav>
        <div class="main-install overview-inst">
            <h2>Picture of the installation</h2>
            <div>
                <div class="image-container">
                    <img src="../../images/tmp_map.png" alt="" width="200px" height="200px">
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
                <input type="text" name="nameInput" id="nameInput">
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

    export default {
        name: 'Manage',
        components : {
            Sidenav
        }
    }
</script>