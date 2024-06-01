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
    time.sleep(2)

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
    time.sleep(15)

def search_for_jobs(driver, job_title, location):
    # Implement job search logic using appropriate selectors and handling potential errors
    # (use explicit waits and validate user input)
    job_input = driver.find_element(By.XPATH, '//*[@id="text-input-what"]')
    job_input.send_keys(job_title)

    time.sleep(4)

    try:
        location_input = driver.find_element(By.CSS_SELECTOR, '#text-input-where')
        print("location found", location_input)
        time.sleep(4)
        location_input.send_keys(location)
        time.sleep(2)
        location_input.send_keys(Keys.RETURN)
    except:
        print("location not found")

    # location_input.send_keys(location)
    # time.sleep(2)
    # location_input.send_keys(Keys.RETURN)

    time.sleep(5)



def extract_job_data(driver):
    job_data = []
    # Implement scraping logic using appropriate selectors and handling potential errors
    # (consider using WebDriverWait and exception handling)
    # time.sleep(10)
    jobs = driver.find_elements(By.CLASS_NAME, 'css-5lfssm eu4oa1w0')

    print("jobs: ",len(jobs))
    for job in jobs:
        try:
            driver.find_element
            role = job.find_element(By.TAG_NAME, 'jcs-JobTitle css-jspxzf eu4oa1w0')
            company_name = job.find_element(By.CLASS_NAME, 'css-92r8pb eu4oa1w0')
            location = job.find_element(By.CLASS_NAME, 'css-1p0sjhy eu4oa1w0')
            print()
            print('Job Role: ', role.text)
            print('Company Name: ', company_name.text)
            print('Job Location: ', location.text)
            print()
            job_data.append({
                'role': role.text,
                'company_name': company_name.text,
                'location': location.text
            })
        except Exception as e:
            print(f"Error extracting job data: {e}")

    return job_data


def save_to_database(job_data, database_name):
    try:
        con = sq.connect(database_name)
        cur = con.cursor()
        # Implement database operations with error handling
        con.commit()
    except Exception as e:
        print(f"Error saving data to database: {e}")
    finally:
        con.close()


def save_to_json(job_data, json_filename):
    # Implement JSON serialization and file writing
    pass


def main():
    job_title = input("Enter the job title you want to work in: ")
    location = input("Is there any preferred location: ")

    username = "devtestm52@gmail.com"
    password = "Aviral$123"

    driver = open_chrome()
    driver.get('https://www.indeed.com')
    login_to_indeed(driver, username, password)  # Replace with actual login logic
    google_login(driver, username, password)

    search_for_jobs(driver, job_title, location)

    job_data = extract_job_data(driver)
    
    print("job_data: ",job_data)


if __name__ == "__main__":
    main()