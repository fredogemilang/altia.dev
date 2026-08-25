<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | ALTIA DEV</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Space Grotesk", sans-serif;
            color: #2F2A26;
            background: #FFF6E8;
            padding: 30px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #FFFDF9;
            border: 1px solid #EDE3D2;
            border-radius: 20px;
            padding: 36px;
            box-shadow: 0 10px 30px rgba(47, 42, 38, 0.05);
          }
          .header {
            border-b: 1px solid #EDE3D2;
            padding-bottom: 24px;
            margin-bottom: 24px;
          }
          .brand {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #E34234;
            background: rgba(227, 66, 52, 0.1);
            padding: 4px 12px;
            border-radius: 9999px;
            margin-bottom: 12px;
          }
          h1 {
            font-size: 28px;
            font-weight: 800;
            color: #2F2A26;
            letter-spacing: -0.02em;
            margin-bottom: 8px;
          }
          p.desc {
            font-size: 14px;
            color: #7A7269;
            max-width: 700px;
          }
          .meta-info {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 16px;
            font-size: 13px;
            color: #7A7269;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }
          .meta-badge {
            background: #F0E8DC;
            padding: 3px 10px;
            border-radius: 6px;
            font-weight: 600;
            color: #2F2A26;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 13px;
          }
          th {
            text-align: left;
            padding: 12px 14px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #7A7269;
            background: #F7EFE3;
            border-bottom: 1px solid #EDE3D2;
          }
          th:first-child {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
          th:last-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          td {
            padding: 14px;
            border-bottom: 1px solid #F0E8DC;
            vertical-align: middle;
          }
          tr:hover td {
            background: rgba(227, 66, 52, 0.03);
          }
          a {
            color: #2F2A26;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.15s ease;
          }
          a:hover {
            color: #E34234;
            text-decoration: underline;
          }
          .url-cell {
            word-break: break-all;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12px;
          }
          .tag-badge {
            display: inline-block;
            font-size: 11px;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            background: #F0E8DC;
            color: #5A524A;
            padding: 2px 8px;
            border-radius: 4px;
          }
          .date-cell {
            color: #7A7269;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 12px;
            white-space: nowrap;
          }
          .footer {
            margin-top: 32px;
            padding-top: 20px;
            border-top: 1px solid #EDE3D2;
            font-size: 12px;
            color: #7A7269;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .footer a {
            color: #E34234;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="brand">ALTIA DEV Studio</span>
            <h1>XML Sitemap</h1>
            <p class="desc">
              This XML Sitemap is generated for search engines (Google, Bing) and AI crawlers to discover and index all public pages, portfolio case studies, and engineering blog articles on ALTIA DEV.
            </p>
            <div class="meta-info">
              <xsl:if test="sitemap:sitemapindex">
                <span>Total Sitemaps: <strong class="meta-badge"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong></span>
              </xsl:if>
              <xsl:if test="sitemap:urlset">
                <span>Total URLs: <strong class="meta-badge"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></span>
              </xsl:if>
              <span>•</span>
              <a href="https://altia.dev/sitemap.xml">Main Sitemap Index</a>
            </div>
          </div>

          <!-- SITEMAP INDEX VIEW -->
          <xsl:if test="sitemap:sitemapindex">
            <table>
              <thead>
                <tr>
                  <th width="70%">Sitemap URL</th>
                  <th width="30%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td class="url-cell">
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td class="date-cell">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>

          <!-- URLSET VIEW -->
          <xsl:if test="sitemap:urlset">
            <table>
              <thead>
                <tr>
                  <th width="65%">Page URL</th>
                  <th width="15%">Images</th>
                  <th width="20%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="url-cell">
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="count(image:image) &gt; 0">
                          <span class="tag-badge"><xsl:value-of select="count(image:image)"/> Images</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span style="color:#B8AEA2;">—</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="date-cell">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>

          <div class="footer">
            <span>ALTIA DEV · Creative Design &amp; AI Engineering Studio</span>
            <span><a href="https://altia.dev">altia.dev</a></span>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
