import { mysqlTable,/* mysqlSchema, AnyMySqlColumn,*/ primaryKey, varchar, text, int, uniqueIndex, index, mysqlEnum, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm";


export const account = mysqlTable("Account", {
	userId: varchar("userId", { length: 191 }).notNull(),
	type: varchar("type", { length: 191 }).notNull(),
	provider: varchar("provider", { length: 191 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: int("expires_at"),
	token_type: varchar("token_type", { length: 191 }),
	scope: varchar("scope", { length: 191 }),
	id_token: text("id_token"),
	session_state: varchar("session_state", { length: 191 }),
},
(table) => {
	return {
		accountProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId)
	}
});

export const blog = mysqlTable("Blog", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	title: varchar("title", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	status: mysqlEnum("status", ['PUBLISHED','DRAFT','SCHEDULE']).default('PUBLISHED').notNull(),
	featuredImage: varchar("featuredImage", { length: 191 }).notNull(),
	authorId: varchar("authorId", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'date', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'date', fsp: 3 }).notNull(),
	schema: varchar("schema", { length: 191 }).notNull(),
	body: varchar("body", { length: 191 }).notNull(),
	headerId: varchar("headerId", { length: 191 }).notNull(),
	footerId: varchar("footerId", { length: 191 }).notNull(),
	likes: int("likes"),
	disLikes: int("disLikes"),
},
(table) => {
	return {
		titleKey: uniqueIndex("Blog_title_key").on(table.title),
		descriptionKey: uniqueIndex("Blog_description_key").on(table.description),
		slugKey: uniqueIndex("Blog_slug_key").on(table.slug),
		featuredImageKey: uniqueIndex("Blog_featuredImage_key").on(table.featuredImage),
		schemaKey: uniqueIndex("Blog_schema_key").on(table.schema),
		bodyKey: uniqueIndex("Blog_body_key").on(table.body),
		idSlugAuthorIdIdx: index("Blog_id_slug_authorId_idx").on(table.id, table.slug, table.authorId),
	}
});

export const bookmark = mysqlTable("Bookmark", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
});

export const category = mysqlTable("Category", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	category1: varchar("category1", { length: 191 }).notNull(),
	category2: varchar("category2", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }).notNull(),
	image: varchar("image", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	profileId: varchar("profileId", { length: 191 }),
},
(table) => {
	return {
		category1Category2Key: uniqueIndex("Category_category1_category2_key").on(table.category1, table.category2),
	}
});

export const comment = mysqlTable("Comment", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	comment: varchar("comment", { length: 191 }).notNull(),
	postId: varchar("postId", { length: 191 }).notNull(),
	likes: int("likes").notNull(),
	disLikes: int("disLikes").notNull(),
},
(table) => {
	return {
		userIdCommentPostIdKey: uniqueIndex("Comment_userId_comment_postId_key").on(table.userId, table.comment, table.postId),
	}
});

export const contributedOnBlogs = mysqlTable("ContributedOnBlogs", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
	blogId: varchar("blogId", { length: 191 }).notNull(),
});

export const contributedOnPages = mysqlTable("ContributedOnPages", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
	pageId: varchar("pageId", { length: 191 }).notNull(),
});

export const contributedOnPosts = mysqlTable("ContributedOnPosts", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
	postId: varchar("postId", { length: 191 }).notNull(),
});

export const feedback = mysqlTable("Feedback", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	feedback: varchar("feedback", { length: 191 }).notNull(),
	rating: int("rating").notNull(),
	postId: varchar("postId", { length: 191 }),
	blogId: varchar("blogId", { length: 191 }),
});

export const follows = mysqlTable("Follows", {
	followerId: varchar("followerId", { length: 191 }).notNull(),
	followingId: varchar("followingId", { length: 191 }).notNull(),
},
(table) => {
	return {
		followsFollowerIdFollowingId: primaryKey(table.followerId, table.followingId)
	}
});

export const footer = mysqlTable("Footer", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	logo: varchar("logo", { length: 191 }).notNull(),
	footerNavId: varchar("footerNavId", { length: 191 }).notNull(),
},
(table) => {
	return {
		logoKey: uniqueIndex("Footer_logo_key").on(table.logo),
	}
});

export const footerNav = mysqlTable("FooterNav", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
});

export const footerNavItem = mysqlTable("FooterNavItem", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }),
	navId: varchar("navId", { length: 191 }).notNull(),
	footerNavId: varchar("footerNavId", { length: 191 }),
},
(table) => {
	return {
		slugKey: uniqueIndex("FooterNavItem_slug_key").on(table.slug),
	}
});

export const header = mysqlTable("Header", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	logo: varchar("logo", { length: 191 }).notNull(),
	headerNavId: varchar("headerNavId", { length: 191 }).notNull(),
},
(table) => {
	return {
		logoKey: uniqueIndex("Header_logo_key").on(table.logo),
	}
});

export const headerNav = mysqlTable("HeaderNav", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
});

export const headerNavItem = mysqlTable("HeaderNavItem", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }),
	navId: varchar("navId", { length: 191 }).notNull(),
	headerNavId: varchar("headerNavId", { length: 191 }),
},
(table) => {
	return {
		slugKey: uniqueIndex("HeaderNavItem_slug_key").on(table.slug),
	}
});

export const page = mysqlTable("Page", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	title: varchar("title", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	status: mysqlEnum("status", ['PUBLISHED','DRAFT','SCHEDULE']).default('PUBLISHED').notNull(),
	featuredImage: varchar("featuredImage", { length: 191 }).notNull(),
	authorId: varchar("authorId", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'date', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'date', fsp: 3 }).notNull(),
	schema: varchar("schema", { length: 191 }).notNull(),
	body: varchar("body", { length: 191 }).notNull(),
	headerId: varchar("headerId", { length: 191 }).notNull(),
	footerId: varchar("footerId", { length: 191 }).notNull(),
},
(table) => {
	return {
		titleKey: uniqueIndex("Page_title_key").on(table.title),
		descriptionKey: uniqueIndex("Page_description_key").on(table.description),
		slugKey: uniqueIndex("Page_slug_key").on(table.slug),
		featuredImageKey: uniqueIndex("Page_featuredImage_key").on(table.featuredImage),
		schemaKey: uniqueIndex("Page_schema_key").on(table.schema),
		bodyKey: uniqueIndex("Page_body_key").on(table.body),
		idSlugIdx: index("Page_id_slug_idx").on(table.id, table.slug),
	}
});

export const post = mysqlTable("Post", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	title: varchar("title", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	featuredImage: varchar("featuredImage", { length: 191 }).notNull(),
	status: mysqlEnum("status", ['PUBLISHED','DRAFT','SCHEDULE']).default('PUBLISHED').notNull(),
	authorId: varchar("authorId", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'date', fsp: 3 }).default(sql`(CURRENT_TIMESTAMP(3))`).notNull(),
	schema: varchar("schema", { length: 191 }).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'date', fsp: 3 }).notNull(),
	taxonomyId: varchar("taxonomyId", { length: 191 }).notNull(),
	body: varchar("body", { length: 191 }).notNull(),
	headerId: varchar("headerId", { length: 191 }).notNull(),
	footerId: varchar("footerId", { length: 191 }).notNull(),
	likes: int("likes").notNull(),
	disLikes: int("disLikes").notNull(),
	publicationId: varchar("publicationId", { length: 191 }).notNull(),
	bookmarkId: varchar("bookmarkId", { length: 191 }),
},
(table) => {
	return {
		featuredImageKey: uniqueIndex("Post_featuredImage_key").on(table.featuredImage),
		schemaKey: uniqueIndex("Post_schema_key").on(table.schema),
		idSlugTaxonomyIdIdx: index("Post_id_slug_taxonomyId_idx").on(table.id, table.slug, table.taxonomyId),
	}
});

export const postsOnTags = mysqlTable("PostsOnTags", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	postId: varchar("postId", { length: 191 }).notNull(),
	tagId: varchar("tagId", { length: 191 }).notNull(),
});

export const profile = mysqlTable("Profile", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	bio: varchar("bio", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
},
(table) => {
	return {
		userIdKey: uniqueIndex("Profile_userId_key").on(table.userId),
	}
});

export const publication = mysqlTable("Publication", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	logo: varchar("logo", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }).notNull(),
	userOnRoleId: varchar("userOnRoleId", { length: 191 }).notNull(),
},
(table) => {
	return {
		nameKey: uniqueIndex("Publication_name_key").on(table.name),
	}
});

export const roleOnPublication = mysqlTable("RoleOnPublication", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	role: mysqlEnum("role", ['user','editor','contributor','sponsor','admin','owner']).notNull(),
	publicationId: varchar("publicationId", { length: 191 }).notNull(),
},
(table) => {
	return {
		rolePublicationIdKey: uniqueIndex("RoleOnPublication_role_publicationId_key").on(table.role, table.publicationId),
	}
});

export const session = mysqlTable("Session", {
	sessionToken: varchar("sessionToken", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'date', fsp: 3 }).notNull(),
},
(table) => {
	return {
		sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
	}
});

export const social = mysqlTable("Social", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	platform: mysqlEnum("platform", ['youtube','twitter','facebook','instagram','github']).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	footerId: varchar("footerId", { length: 191 }),
},
(table) => {
	return {
		platformSlugKey: uniqueIndex("Social_platform_slug_key").on(table.platform, table.slug),
	}
});

export const socialsOnProfile = mysqlTable("SocialsOnProfile", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	socialId: varchar("socialId", { length: 191 }).notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
});

export const tag = mysqlTable("Tag", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: varchar("description", { length: 191 }).notNull(),
	image: varchar("image", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	profileId: varchar("profileId", { length: 191 }).notNull(),
},
(table) => {
	return {
		idNameIdx: index("Tag_id_name_idx").on(table.id, table.name),
	}
});

export const tagsOnUsers = mysqlTable("TagsOnUsers", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	tagId: varchar("tagId", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
});

export const taxonomyOnUsers = mysqlTable("TaxonomyOnUsers", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	categoryId: varchar("categoryId", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
});

export const user = mysqlTable("User", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: varchar("name", { length: 191 }),
	email: varchar("email", { length: 191 }).notNull(),
	emailVerified: datetime("emailVerified", { mode: 'date', fsp: 3 }),
	image: varchar("image", { length: 191 }),
	postId: varchar("postId", { length: 191 }),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});

export const userOnRole = mysqlTable("UserOnRole", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
});

export const verificationToken = mysqlTable("VerificationToken", {
	identifier: varchar("identifier", { length: 191 }).notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'date', fsp: 3 }).notNull(),
},
(table) => {
	return {
		tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
		verificationTokenIdentifierToken: primaryKey(table.identifier, table.token)
	}
});