import os
import time
import random
from playwright.sync_api import sync_playwright

# --- 1. Human Emulation Engine ---
def human_delay(min_time=1.5, max_time=4.0):
    time.sleep(random.uniform(min_time, max_time))

def ghost_scroll(page):
    scroll_amount = random.randint(300, 700)
    page.mouse.wheel(0, scroll_amount)
    human_delay(0.5, 1.5)
    page.mouse.wheel(0, -abs(scroll_amount // 2)) 

def natural_typing(page, selector, text):
    page.click(selector)
    human_delay(0.5, 1.0)
    for char in text:
        page.type(selector, char, delay=random.randint(30, 120))
        if random.random() < 0.05:
            time.sleep(random.uniform(0.1, 0.4))

# --- 2. Psychological Template Generator ---
def generate_viral_tweet(job_title, company, salary, job_link):
    hooks = [
        "Stop scrolling. Your next big career move is right here. 👇",
        "Tired of applying to ghost jobs? We just vetted this exclusive remote role.",
        "Remote. High-paying. Fast interview process. 🚀"
    ]
    
    tweet = f"{random.choice(hooks)}\n\n"
    tweet += f"💼 Role: {job_title}\n"
    tweet += f"🏢 Company: {company}\n"
    tweet += f"💰 Salary: {salary}\n\n"
    tweet += f"Secure your spot before the pipeline closes:\n🔗 {job_link}\n\n"
    tweet += "#RemoteJobs #TechCareers"
    
    return tweet

# --- 3. The Core Automation ---
def post_pro_tweet(job_data):
    print("🚀 Initiating Stealth Browser...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=False, 
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        # --- فکس: لاگ ان فائل چیک کرنے کی لاجک ---
        context_args = {
            "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "viewport": {"width": 1366, "height": 768}
        }
        
        # اگر فائل پہلے سے موجود ہے تو اسے لوڈ کریں
        if os.path.exists("twitter_auth.json"):
            context_args["storage_state"] = "twitter_auth.json"
            print("📂 Saved login session found!")
        else:
            print("🆕 First run detected! You will need to login manually.")
            
        context = browser.new_context(**context_args)
        # -------------------------------------------
        
        page = context.new_page()
        
        try:
            print("🌐 Navigating to Twitter...")
            page.goto("https://twitter.com/compose/tweet", timeout=60000)
            
            # --- پہلی بار لاگ ان کا انتظار ---
            if not os.path.exists("twitter_auth.json"):
                print("⚠️ WAITING FOR MANUAL LOGIN...")
                print("⏳ PLEASE ENTER YOUR EMAIL AND PASSWORD IN THE OPEN BROWSER WINDOW.")
                print("⏳ The script will wait here until you successfully login...")
                # لاگ ان ہونے کے بعد ٹویٹ باکس ظاہر ہونے کا انتظار کریں
                page.wait_for_selector('div[data-testid="tweetTextarea_0"]', timeout=90000) 
                print("🔓 Login successful! Saving session for future...")
                context.storage_state(path="twitter_auth.json") # سیشن محفوظ کر لیا
            else:
                page.wait_for_selector('div[data-testid="tweetTextarea_0"]', timeout=30000)
            
            human_delay(3, 6)
            ghost_scroll(page)
            
            print("✍️ Drafting psychological copy...")
            tweet_text = generate_viral_tweet(
                job_data['title'], 
                job_data['company'], 
                job_data['salary'], 
                job_data['link']
            )
            
            natural_typing(page, 'div[data-testid="tweetTextarea_0"]', tweet_text)
            
            print("🎯 Finalizing and clicking post...")
            human_delay(1, 2)
            page.click('div[data-testid="tweetButtonInline"]')
            
            human_delay(4, 5)
            print("✅ MISSION ACCOMPLISHED: Pro Tweet is live!")
            
        except Exception as e:
            print(f"❌ Error encountered: {e}")
            
        finally:
            browser.close()

# --- 4. Execution ---
import os
from supabase import create_client, Client

# (آپ کا اوپر والا سارا Playwright اور ٹویٹ کا کوڈ ویسے ہی رہے گا)

# --- 4. Live Supabase Execution ---
def fetch_and_tweet_latest_job():
    # .env.local سے Supabase کی چابیاں اٹھانا
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    supabase: Client = create_client(url, key)

    try:
        print("🔍 Fetching the latest hot job from Supabase...")
        # فرض کریں آپ کے ٹیبل کا نام 'jobs' ہے۔ یہ سب سے نئی نوکری اٹھائے گا
        response = supabase.table('jobs').select('*').order('created_at', desc=True).limit(1).execute()
        
        if len(response.data) > 0:
            latest_job = response.data[0]
            
            # ڈیٹا کو اپنے فارمیٹ میں سیٹ کریں
            job_data = {
                'title': latest_job.get('title', 'Awesome Tech Role'),
                'company': latest_job.get('company', 'Top US Company'),
                'salary': latest_job.get('salary', 'Competitive Salary'),
                # یہ اصلی لنک بنائے گا جس سے 404 نہیں آئے گا
                'link': f"https://us-jobs-frontend.vercel.app/jobs/{latest_job.get('id')}"
            }
            
            # ٹویٹ پوسٹ کرنے والا فنکشن کال کریں
            post_pro_tweet(job_data)
        else:
            print("⚠️ No jobs found in the database yet!")
            
    except Exception as e:
        print(f"❌ Supabase Error: {e}")

if __name__ == "__main__":
    fetch_and_tweet_latest_job()