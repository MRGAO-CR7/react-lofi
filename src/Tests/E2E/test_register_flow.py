from playwright.sync_api import Page, expect


def test_step1_validation_errors(page: Page, base_url: str):
    page.goto(base_url)
    page.wait_for_load_state("networkidle")

    expect(page.get_by_role("heading", name="Register card form")).to_be_visible()
    expect(page.get_by_text("Welcome User")).to_be_visible()

    page.get_by_label("Credit card number").fill("411111111111")
    page.get_by_label("CVC").fill("12")
    page.get_by_label("Expiry").fill("123")

    page.get_by_role("button", name="Submit").click()

    expect(
        page.get_by_text("Enter a valid card number (13-16 digits)")
    ).to_be_visible(timeout=5000)
    expect(page.get_by_text("CVC must be 3 or 4 digits")).to_be_visible(timeout=5000)
    expect(page.get_by_text("Enter expiry as MM/YY")).to_be_visible(timeout=5000)


def test_step2_valid_submit_success(page: Page, base_url: str):
    page.goto(base_url)
    page.wait_for_load_state("networkidle")

    page.get_by_label("Credit card number").fill("4111111111111111")
    page.get_by_label("CVC").fill("123")
    page.get_by_label("Expiry").fill("1225")

    page.get_by_role("button", name="Submit").click()

    expect(page.get_by_text("Card registered successfully.")).to_be_visible(
        timeout=10000
    )


def test_step3_navigation_menu_and_back(page: Page, base_url: str):
    page.goto(base_url)
    page.wait_for_load_state("networkidle")

    page.get_by_role("button", name="Open menu").click()

    expect(page.get_by_role("heading", name="Menu")).to_be_visible(timeout=5000)
    expect(page.get_by_text("This is menu content")).to_be_visible(timeout=5000)

    page.get_by_role("button", name="Go back").click()

    expect(
        page.get_by_role("heading", name="Register card form")
    ).to_be_visible(timeout=5000)
    expect(page.get_by_text("Welcome User")).to_be_visible(timeout=5000)


def test_full_register_flow(page: Page, base_url: str):
    page.goto(base_url)
    page.wait_for_load_state("networkidle")

    expect(page.get_by_role("heading", name="Register card form")).to_be_visible()
    expect(page.get_by_text("Welcome User")).to_be_visible()

    page.get_by_label("Credit card number").fill("411111111111")
    page.get_by_label("CVC").fill("12")
    page.get_by_label("Expiry").fill("123")

    page.get_by_role("button", name="Submit").click()

    expect(
        page.get_by_text("Enter a valid card number (13-16 digits)")
    ).to_be_visible(timeout=5000)
    expect(page.get_by_text("CVC must be 3 or 4 digits")).to_be_visible(timeout=5000)
    expect(page.get_by_text("Enter expiry as MM/YY")).to_be_visible(timeout=5000)

    page.get_by_label("Credit card number").fill("4111111111111111")
    page.get_by_label("CVC").fill("123")
    page.get_by_label("Expiry").fill("1225")

    page.get_by_role("button", name="Submit").click()

    expect(page.get_by_text("Card registered successfully.")).to_be_visible(
        timeout=10000
    )

    page.get_by_role("button", name="Open menu").click()

    expect(page.get_by_role("heading", name="Menu")).to_be_visible(timeout=5000)
    expect(page.get_by_text("This is menu content")).to_be_visible(timeout=5000)

    page.get_by_role("button", name="Go back").click()

    expect(
        page.get_by_role("heading", name="Register card form")
    ).to_be_visible(timeout=5000)
