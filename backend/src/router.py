from fastapi import APIRouter

from companies.router import router as companies_router
from users.router import router as users_router
from comments.router import router as comment_router
from lists.router import router as lists_router


router = APIRouter(prefix='/v1')
router.include_router(companies_router, tags=['company'], prefix='/company')
router.include_router(users_router, tags=['user'], prefix='/user')
router.include_router(comment_router, tags=['comment'], prefix='/comment')
router.include_router(lists_router, tags=['lists'], prefix='/lists')