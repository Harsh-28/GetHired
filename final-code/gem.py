from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
# from selenium.webdriver.support.expected_conditions import EC
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
import sqlite3 as sq
import json
import time
from bs4 import BeautifulSoup


def open_chrome():
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')  # Consider headless mode if needed
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    return driver


def login_to_indeed(driver, username, password):
    # Implement login logic using appropriate selectors and handling potential errors
    # (consider using WebDriverWait for waiting on elements)
    sign_in_btn = driver.find_element(By.LINK_TEXT, 'Sign in')
    time.sleep(3)
    sign_in_btn.click()
    

def google_login(driver, username, password):
    
    continue_with_google_btn = driver.find_element(By.ID, 'login-google-button')
    time.sleep(2)
    continue_with_google_btn.click()
    time.sleep(3)


    # * Parent window
    main_window_handle = driver.window_handles[0]
    # * Child window 
    pop_up_window_handle = driver.window_handles[1]
    # * switching to pop-up window
    driver.switch_to.window(pop_up_window_handle) 


    email_input = driver.find_element(By.ID, 'identifierId')
    time.sleep(2)

    email_input.send_keys(username)
    time.sleep(2)

    email_input.send_keys(Keys.RETURN)
    time.sleep(5)

    password_input = driver.find_element(By.XPATH, '//*[@id="password"]/div[1]/div/div[1]/input')
    time.sleep(2)

    password_input.send_keys(password)
    time.sleep(2)

    password_input.send_keys(Keys.RETURN)

    # * switching back to main window
    try:
        main_window = driver.window_handles[0]
        driver.switch_to.window(main_window) 
    except:
        pass
    time.sleep(7)

def search_for_jobs(driver, job_title, location):
    # Implement job search logic using appropriate selectors and handling potential errors
    # (use explicit waits and validate user input)
    time.sleep(3)
    job_input = driver.find_element(By.XPATH, '//*[@id="text-input-what"]')
    job_input.send_keys(job_title)


    try:
        time.sleep(1)
        location_input = driver.find_element(By.CSS_SELECTOR, '#text-input-where')
        # print("location found", location_input)
        time.sleep(3)
        location_input.send_keys(location)

        try:
            find_jobs_btn = driver.find_element(By.XPATH, '//*[@id="jobsearch"]/div/div[2]/button')
            time.sleep(3)
            find_jobs_btn.click()

        except:
            pass


    except:
        # print("location not found")
        pass

    time.sleep(5)



def extract_job_data(driver):

    time.sleep(5)

    jobs = driver.find_elements(By.CLASS_NAME, 'css-5lfssm eu4oa1w0')
    check_jobs = driver.find_elements(By.CSS_SELECTOR, '.css-5lfssm .eu4oa1w0')

    print("jobs: ",len(jobs))
    print('check_jobs: ', len(check_jobs), type(check_jobs))
    

    time.sleep(3)
    scroll_page(driver)

    job_title_list = []
    company_name_list = []
    job_description_list = []

    for job in check_jobs:

        inner_html = job.get_attribute('innerHTML')
        soup = BeautifulSoup(inner_html, 'html.parser')

        try:
            job_title = soup.find('h2', class_='jobTitle css-198pbd eu4oa1w0')            # print()
            company_name = soup.find('span', class_='css-92r8pb eu4oa1w0')
            job_description = soup.find('div', class_='css-9446fg eu4oa1w0')


            if job_title.text not in job_title_list:
                if company_name.text not in company_name_list:
                    if job_description.text not in job_description_list:
                        job_title_list.append(job_title.text)
                        company_name_list.append(company_name.text)
                        # job_description_list.append(job_description.text)

                        temp_list = job_description.text.split('\n')
                        for i in temp_list:
                            if i == '':
                                temp_list.remove(i)
                        job_description_list.append(temp_list)

        except Exception as e:
            pass


    # print(len(job_title_list), job_title_list, '\n')
    # print(len(company_name_list), company_name_list, '\n')
    # print(len(job_description_list), job_description_list, '\n')

    create_json_file(job_title_list, company_name_list, job_description_list)



# def save_to_database(job_data, database_name):
#     try:
#         con = sq.connect(database_name)
#         cur = con.cursor()
#         # Implement database operations with error handling
#         con.commit()
#     except Exception as e:
#         print(f"Error saving data to database: {e}")
#     finally:
#         con.close()


def scroll_page(driver, scroll_pause_time=1):
    # Get scroll height
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        # Scroll down to bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load the page
        time.sleep(scroll_pause_time)

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height


def create_json_file(job_title_list, company_name_list, job_description_list,):
    
    data = []

    for a,b,c in zip(job_title_list, company_name_list, job_description_list):
        d={
            'job_title':a,
            'company_name':b,
            'job_description':c
        }
        data.append(d)
    print("data: ", data)

    with open('data.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)

def main():

    job_title = input("Enter the job title you want to work in: ")
    location = input("Is there any preferred location: ")

    username = "devtestm52@gmail.com"
    password = "Aviral$123"

    driver = open_chrome()

    screen_width = driver.execute_script("return screen.width;")
    screen_height = driver.execute_script("return screen.height;")

    # Set the browser window position to the left (0,0) and size to half of the screen width and full height
    driver.set_window_position(0, 0)
    driver.set_window_size(screen_width // 2, screen_height)


    # opening indeed.com
    driver.get('https://www.indeed.com')

    login_to_indeed(driver, username, password)  

    # login with your username and password using google
    google_login(driver, username, password)

    search_for_jobs(driver, job_title, location)

    extract_job_data(driver)



if __name__ == "__main__":
    main()