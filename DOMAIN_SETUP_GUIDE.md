# Custom Domain Setup Guide - Tasjeel → Vercel

## Domain Information

**Domain Registrar**: Tasjeel (UAE)
**Hosting Platform**: Vercel
**Project**: kitchen-core

---

## Step-by-Step Setup Process

### 1. Add Domain in Vercel Dashboard

1. **Navigate to Project Settings**:
   - Go to: https://vercel.com/bassam2/kitchen-core
   - Click **Settings** (top navigation)
   - Click **Domains** (left sidebar)

2. **Add Your Domain**:
   - In the "Add Domain" field, enter your domain (e.g., `kitchencore.ae`)
   - Click **Add**
   - Vercel will display DNS configuration instructions

3. **Note the DNS Records**:
   Vercel will show you records like:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

### 2. Configure DNS in Tasjeel

**Login to Tasjeel Dashboard**:
- Go to: https://www.tasjeel.ae
- Login with your account credentials
- Navigate to "My Domains" or "Domain Management"
- Select your domain

**Configure DNS Records**:

#### Option A: A Record + CNAME (Recommended)

**For Root Domain (yourdomain.ae)**:
1. Add A Record:
   - **Type**: A
   - **Host/Name**: @ (or blank)
   - **Points To/Value**: `76.76.21.21`
   - **TTL**: 3600 (or Auto)

**For WWW Subdomain (www.yourdomain.ae)**:
2. Add CNAME Record:
   - **Type**: CNAME
   - **Host/Name**: www
   - **Points To/Value**: `cname.vercel-dns.com`
   - **TTL**: 3600 (or Auto)

**Remove conflicting records**:
- Delete any existing A, AAAA, or CNAME records for @ and www
- Keep only MX records (for email) if you have email configured

#### Option B: Vercel Nameservers (Full DNS Control)

**Use this if Option A doesn't work or Tasjeel doesn't support A records to 76.76.21.21**:

1. In Vercel domain settings, copy the nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

2. In Tasjeel dashboard:
   - Find "Nameservers" or "DNS Management"
   - Change from Tasjeel's nameservers to:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```

3. Save changes

**⚠️ Warning**: Changing nameservers will route ALL DNS through Vercel. If you have email (MX records) or other services, you'll need to reconfigure them in Vercel's DNS settings.

---

### 3. Wait for DNS Propagation

**DNS changes take time to propagate worldwide**:
- Minimum: 5-30 minutes
- Typical: 1-6 hours
- Maximum: 24-48 hours (rare)

**Check DNS propagation**:
```bash
# Windows (PowerShell)
nslookup yourdomain.ae

# Expected output:
# Name:    yourdomain.ae
# Address: 76.76.21.21
```

**Online DNS checkers**:
- https://dnschecker.org
- https://www.whatsmydns.net
- Enter your domain and check A record globally

---

### 4. Verify in Vercel

1. **Check Domain Status**:
   - Go to: https://vercel.com/bassam2/kitchen-core/settings/domains
   - Your domain should show status:
     - ✅ **Valid** - Domain is working correctly
     - ⏳ **Pending** - Waiting for DNS or SSL
     - ❌ **Invalid Configuration** - DNS not pointing correctly

2. **SSL Certificate**:
   - Vercel automatically provisions Let's Encrypt SSL
   - Usually takes 5-15 minutes after DNS is valid
   - Certificate renews automatically every 90 days

3. **Test Your Domain**:
   - Open browser
   - Visit: `https://yourdomain.ae`
   - Should load your Kitchen Core website
   - Check: `https://www.yourdomain.ae` (www version)

---

### 5. Update Environment Variables

**After domain is working, update production URLs**:

1. **In Vercel Dashboard**:
   - Go to: https://vercel.com/bassam2/kitchen-core/settings/environment-variables

2. **Update these variables for Production**:
   ```
   NEXTAUTH_URL = https://yourdomain.ae
   NEXT_PUBLIC_SITE_URL = https://yourdomain.ae
   ```

3. **Redeploy**:
   - Go to: https://vercel.com/bassam2/kitchen-core
   - Click **Deployments**
   - Click **...** on latest deployment → **Redeploy**

---

## Common Issues & Troubleshooting

### Issue 1: "Invalid Configuration" in Vercel

**Symptoms**: Domain shows red "Invalid Configuration" in Vercel
**Cause**: DNS not pointing to Vercel servers

**Solution**:
1. Verify DNS records in Tasjeel:
   - A record: @ → 76.76.21.21
   - CNAME record: www → cname.vercel-dns.com
2. Wait 30 minutes for DNS propagation
3. Check DNS with `nslookup yourdomain.ae`
4. If still failing, try nameserver method (Option B above)

### Issue 2: DNS Changes Not Taking Effect

**Symptoms**: DNS checker still shows old IP address
**Cause**: DNS caching or incorrect records

**Solution**:
1. Clear local DNS cache:
   ```powershell
   ipconfig /flushdns
   ```
2. Check TTL (Time To Live) on old records - may need to wait
3. Verify you saved changes in Tasjeel dashboard
4. Some registrars take longer - wait up to 24 hours

### Issue 3: www Version Not Working

**Symptoms**: yourdomain.ae works, but www.yourdomain.ae doesn't
**Cause**: Missing CNAME record

**Solution**:
1. Add CNAME record in Tasjeel:
   - Name: www
   - Value: cname.vercel-dns.com
2. In Vercel, ensure both versions are added:
   - yourdomain.ae
   - www.yourdomain.ae
3. Vercel will auto-redirect www → non-www (or vice versa)

### Issue 4: SSL/HTTPS Not Working

**Symptoms**: Shows "Not Secure" or certificate error
**Cause**: SSL certificate not yet provisioned

**Solution**:
1. Wait 15-30 minutes after DNS is valid
2. Check Vercel domain status - should show "Valid"
3. If "Pending" for > 1 hour, try:
   - Remove domain from Vercel
   - Re-add domain
   - Vercel will retry SSL provisioning
4. If persistent, contact Vercel support

### Issue 5: Tasjeel DNS Panel Issues

**Symptoms**: Can't find DNS settings or records not saving
**Cause**: Tasjeel interface differences or restrictions

**Solution**:
1. **Contact Tasjeel Support**:
   - Email: support@tasjeel.ae
   - Phone: +971 4 391 1999
   - Explain you need to point domain to Vercel
   - Provide them the A/CNAME records above

2. **Request DNS Changes**:
   - Some registrars require manual DNS changes
   - Tasjeel support can configure for you
   - Provide exact records from Vercel

3. **Alternative - Transfer to Vercel**:
   - If Tasjeel is too restrictive
   - Consider transferring domain to:
     - Namecheap (easier DNS management)
     - Cloudflare (free DNS + CDN)
   - Keep registration at Tasjeel, use external DNS

### Issue 6: Domain Shows Vercel 404 Error

**Symptoms**: Domain resolves but shows Vercel 404 page
**Cause**: Domain added to wrong Vercel project

**Solution**:
1. Verify domain is added to **kitchen-core** project
2. In Vercel dashboard, check which project the domain is assigned to
3. Remove domain from wrong project
4. Add domain to kitchen-core project

---

## Verification Checklist

Before asking for help, verify these steps:

- [ ] Domain is purchased and active in Tasjeel
- [ ] Domain is added in Vercel: https://vercel.com/bassam2/kitchen-core/settings/domains
- [ ] DNS A record: @ → 76.76.21.21 (or nameservers changed)
- [ ] DNS CNAME record: www → cname.vercel-dns.com (if using A record method)
- [ ] Waited at least 30 minutes for DNS propagation
- [ ] Checked DNS with `nslookup yourdomain.ae` - shows 76.76.21.21
- [ ] Vercel domain status shows "Valid" (not Pending/Invalid)
- [ ] Domain loads in browser: https://yourdomain.ae
- [ ] SSL certificate is active (https works, no warnings)
- [ ] Environment variables updated with new domain
- [ ] Application redeployed after env variable changes

---

## DNS Configuration Examples

### Example 1: Tasjeel DNS Panel (Typical Layout)

**DNS Management Section**:
```
Record Type:  A
Hostname:     @
IP Address:   76.76.21.21
TTL:          3600
[Save]

Record Type:  CNAME
Hostname:     www
Points To:    cname.vercel-dns.com
TTL:          3600
[Save]
```

### Example 2: Nameserver Configuration

**Nameserver Settings**:
```
Primary Nameserver:   ns1.vercel-dns.com
Secondary Nameserver: ns2.vercel-dns.com
[Update Nameservers]
```

---

## Additional Domain Options

### Redirect www to Root (or vice versa)

**In Vercel**:
- Both www and non-www versions automatically work
- Vercel auto-redirects to your preferred version
- To set preference:
  1. Add both versions as domains
  2. Set one as "Primary"
  3. Others redirect to primary

### Subdomain Setup (e.g., admin.yourdomain.ae)

**To add subdomain**:
1. In Vercel, add subdomain: `admin.yourdomain.ae`
2. In Tasjeel, add CNAME record:
   - Name: admin
   - Value: cname.vercel-dns.com
3. Wait for DNS propagation
4. Configure separate deployment if needed

### Email Configuration (MX Records)

**If you use email with your domain**:

**Using Nameservers (Option B)**:
- After changing to Vercel nameservers
- Go to: https://vercel.com/bassam2/kitchen-core/settings/domains
- Click your domain → DNS Records
- Add MX records manually for your email provider

**Using A/CNAME (Option A)**:
- Keep existing MX records in Tasjeel
- Only change A and CNAME records
- Email continues working normally

---

## Support Resources

### Vercel Support
- **Documentation**: https://vercel.com/docs/concepts/projects/domains
- **Community**: https://github.com/vercel/vercel/discussions
- **Support**: https://vercel.com/support (for paid plans)

### Tasjeel Support
- **Website**: https://www.tasjeel.ae
- **Email**: support@tasjeel.ae
- **Phone**: +971 4 391 1999
- **Hours**: Sunday-Thursday, 9 AM - 6 PM GST

### DNS Tools
- **DNS Checker**: https://dnschecker.org
- **What's My DNS**: https://www.whatsmydns.net
- **MX Toolbox**: https://mxtoolbox.com (for email/MX records)
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

## Quick Commands Reference

### Check DNS Resolution (Windows)
```powershell
# Check A record
nslookup yourdomain.ae

# Check specific nameserver
nslookup yourdomain.ae 8.8.8.8

# Clear DNS cache
ipconfig /flushdns
```

### Check DNS Resolution (Mac/Linux)
```bash
# Check A record
dig yourdomain.ae

# Check CNAME record
dig www.yourdomain.ae

# Clear DNS cache (Mac)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

### Test HTTPS/SSL
```powershell
# Windows PowerShell
curl -I https://yourdomain.ae

# Should return 200 OK
```

---

## Timeline Expectations

**Realistic timeframes for domain setup**:

| Step | Time |
|------|------|
| Add domain in Vercel | Instant |
| Configure DNS in Tasjeel | 5-10 minutes (manual entry) |
| DNS propagation starts | 5-30 minutes |
| DNS fully propagated | 1-24 hours (typically 1-4 hours) |
| Vercel validates DNS | 5-15 minutes after propagation |
| SSL certificate issued | 5-30 minutes after validation |
| **Total: Domain fully working** | **1-6 hours (typical)** |

**Best practice**: Configure DNS, then wait overnight. Check in the morning - usually fully working by then.

---

## Post-Setup Optimization

### After Domain is Working

1. **Set up redirects** (if needed):
   - Redirect HTTP → HTTPS (automatic in Vercel)
   - Redirect www → non-www (or vice versa)

2. **Update all references**:
   - Social media profiles
   - Email signatures
   - Business cards
   - Google My Business

3. **SEO considerations**:
   - Submit new domain to Google Search Console
   - Update sitemap: `https://yourdomain.ae/sitemap.xml`
   - Set up 301 redirects from old domain (if migrating)

4. **Test thoroughly**:
   - All pages load correctly
   - Admin panel: https://yourdomain.ae/admin
   - Contact forms send emails
   - Images load from CDN
   - Arabic (RTL) version works

---

## Need Help?

**If domain is still not working after 24 hours**:

1. **Gather diagnostic info**:
   - Domain name
   - Screenshot of Vercel domain status
   - Screenshot of Tasjeel DNS records
   - Output of `nslookup yourdomain.ae`

2. **Contact me**:
   - Email: bassamfoaud@gmail.com
   - Include all diagnostic info above

3. **Contact Tasjeel Support**:
   - They can verify DNS configuration
   - Can manually configure records for you
   - May identify Tasjeel-specific issues

---

**Last Updated**: November 6, 2025
**Project**: Kitchen Core
**Version**: 1.0
