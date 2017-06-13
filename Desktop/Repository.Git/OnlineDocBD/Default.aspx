<%@ Page Title="" Language="C#" MasterPageFile="~/master/login.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="OnlineDocBD.Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script type="text/javascript" src="scripts/application/login-script.js"></script>

    <script type="text/javascript">
        function HideMessageBox() {
            $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
        }

        $(document).ready(function () {
            $("[id*=btnSignIn]").focusout(function () {
                HideEmailPopover();
            });
        });


        $(function() {
            $('[data-toggle="popover"]').popover();
        });



        function HideEmailPopover() {
            $('#emailPopover').popover('hide');
            $('#passwordPopover').popover('hide');
        }

        function LoginFormValidation() {
            isAllValid = true;
            var emailInText = $.trim($("[id*=txtEmail]").val());
            var passInText = $.trim($("[id*=txtPassword]").val());

            if (emailInText == "") {
                $('#emailPopover').attr("data-content", "Enter your email address.");
                $('#emailPopover').popover('show');

                isAllValid = false;
            }


            if (emailInText != "" && !emailRegEx.test(emailInText)) {
                $('#emailPopover').attr("data-content", "Please enter a valid email address.");
                $('#emailPopover').popover('show');
                isAllValid = false;
            }

            if (emailInText != "" && emailRegEx.test(emailInText) && passInText == "") {
                $('#passwordPopover').attr("data-content", "Enter your password.");
                $('#emailPopover').popover('hide');
                $('#passwordPopover').popover('show');

                isAllValid = false;
            }


            return isAllValid;
        }
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <asp:ScriptManagerProxy ID="scrptManagerProxy" runat="server">
    </asp:ScriptManagerProxy>
    <asp:UpdatePanel ID="upnlLogin" runat="server" UpdateMode="Conditional">
        <ContentTemplate>
            <header class="logo-container new-logo-container">
            <%--    <img src="<%= BDSKendoWebApp.Utilities.SiteSettings.BaseUrl %>images/logos/CWC-Logo-H.jpg"
                    alt="" class="img-responsive" />--%>
                <h1>
                    Sign in to OnlineDoc</h1>
            </header>
            <section>
                <div class="form-group col-sm-12 no-padding custom-margin">
                    <label for="inputEmail" class="col-form-label">
                        Email</label>
                    <span class="pull-right error-message">Try again</span>
                    <div class="">
                        <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control col-sm-12 dummy_vld"
                            placeholder="Email" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();"  onfocus="HideEmailPopover();"></asp:TextBox>
                    </div>
                    <div class="">
                        <button type="button" id="emailPopover" class="btn btn-default btn-popover"  data-container="body" data-trigger="focus"
                            data-toggle="popover" data-placement="bottom" data-content="">
                           
                        </button>
                    </div>
                </div>
                <div class="form-group col-sm-12 no-padding ">
                    <!-- has-error -->
                    <label for="inputPassword" class="col-form-label">
                        Password</label>
                    <span class="pull-right error-message" style="display: none;">Try again</span>
                   
                        <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" title="Password"
                            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Password" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>
                    
                    
                        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
                            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
                            
                        </button>
                    
                </div>
                <div class="form-group col-sm-12 no-padding">
                    <asp:Button ID="btnSignIn" runat="server" CssClass="btn btn-primary pull-left" Text="Sign in"
                        OnClientClick="return LoginFormValidation();" />
                    <a href="forgot-password.aspx" class="forgot-password pull-left">Forgotten Password | </a>
                   
                   &nbsp;<a href="users/users-operation.aspx" class="forgot-password pull-left">Create new User</a>
                </div>
                <div id="MainContent_divMessage" runat="server" class="bg-danger dng error-box" style="display: none;">
                    <span class="col-xs-12">Incorrect fields.</span><span class="col-xs-12">Please try again.</span>
                </div>
            </section>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
