<?php
/**
 * Plugin Name: Newsletter contacts
 * Description: Lista todos os contatos adquiridos no newsletter do blog
 * Version: 0.1.0
 * Requires at least: 5.8
 * Requires PHP: 7.0
 * Author: Rafael Colombo
 * Author URI: github.com/rafael-oliveirac
*/
add_action('admin_menu', 'my_admin_submenu');



function my_admin_submenu() {
    $role = get_role("administrator");
    $role->add_cap("read_newsletter");
    
    add_menu_page(
        'Newsletter Contatos', // Page Title
        'Newsletter', // Menu Title
        'read_newsletter', // Capabiliy
        'newsletter', // Menu_slug
        'my_admin_panel_callback', // function
        'dashicons-networking', // icon_url
        6   // position
    );
}


function my_admin_panel_callback() {
    global $wpdb;
    $results = $wpdb->get_results('SELECT * FROM newsletter_contacts');

    ?>
    <div class="wrap">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
            <h1>Contatos newsletter</h1>
            <form action="/action/listarNewsletter.php" method="post">
                <button id="baixarPlanilha" class="button" type="submit" name="baixar-planilha">Baixar Planilha</button>
            </form>
        </div>
            <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Data Criado</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($results as $row) {
                        echo '
                        <tr>
                            <td>' . $row->nome . '</td>
                            <td>' . $row->email . '</td>
                            <td>' . $row->data_criado . '</td>
                        </tr>';
                    }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

