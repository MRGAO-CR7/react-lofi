# E2E Tests (Playwright + pytest)

## Setup

```bash
cd src/Tests/E2E
python3 -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium
```

## Run

1. Start the app in another terminal: `npm start`
2. Run E2E tests (with visible browser): `npm run test:e2e`
3. Run without browser (headless): edit pytest.ini, remove `--headed` from addopts
4. Custom base URL: `pytest test_register_flow.py -v --base-url http://localhost:3000`
