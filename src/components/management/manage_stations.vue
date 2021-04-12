<template>
    <div>
        <sidenav-manage></sidenav-manage>
        <div class="main-install overview-inst">
            <h1>Manage base stations</h1>
            <table>
                <tr>
                    <th>Test</th>
                </tr>
                <tr>
                    <td>Test</td>
                </tr>
            </table>
            <div >
                <button type="submit" class="apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from './manage_sidenav'

export default {
    name: 'ManageStations',
    components : {
        'sidenav-manage' :Sidenav
    }
}
</script>