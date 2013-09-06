from bkr.inttest.server.selenium import WebDriverTestCase
from bkr.inttest.server.webdriver_utils import login, click_menu_item, is_text_present
from bkr.inttest import get_server_base

class AddGroup(WebDriverTestCase):
    def setUp(self):
        self.browser = self.get_browser()
        self.group_name = 'd_group_d'
        self.group_display_name = 'd_group_d'

    def tearDown(self):
        self.browser.quit()
                        
    def test_add_group(self):
        b = self.browser
        b.get(get_server_base())
        login(b)
        click_menu_item(b, 'Admin', 'Groups')
        b.find_element_by_link_text('Add').click()
        b.find_element_by_name('display_name').send_keys(self.group_display_name)
        b.find_element_by_name('group_name').send_keys(self.group_name)
        b.find_element_by_id('Group').submit()
        self.assertEquals(b.find_element_by_class_name('flash').text, 'OK')
        self.assert_(is_text_present(b, self.group_display_name))
