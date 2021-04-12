<template>
    <div>
        <sidenav-account></sidenav-account>
        <div class="main-install overview-inst">
            <h1>Change password</h1>
            <form action="" class="flex-input-container">
                <div class="input-container">
                    <label for="actual-pwd">Actual password</label>
                    <input type="password" name="actual-pwd" id="actual-pwd">
                </div>
                <div class="input-container">
                    <label for="new-pwd">New password</label>
                    <input type="password" name="new-pwd" id="new-pwd">
                </div>
                <div class="input-container">
                    <label for="con-pwd">Confirmation new password</label>
                    <input type="password" name="con-pwd" id="con-pwd">
                </div>
            </form>
            <div>
                <button type="submit" class="apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>

import Sidenav from './account_sidenav'

export default {
    name: 'Password',
    components : {
        'sidenav-account' :Sidenav
    }
}
</script>