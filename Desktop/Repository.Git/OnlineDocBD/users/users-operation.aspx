<%@ Page Title="" Language="C#" MasterPageFile="~/master/site.Master" AutoEventWireup="true" CodeBehind="users-operation.aspx.cs" Inherits="OnlineDocBD.users.users_operation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">

     <script type="text/javascript">

        function GetCodeBehindProperty() {
            isEditMode = "<%= IsEditMode %>";
            loginUserID = "<%= loginUserID %>";
        }

    </script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h3>Create new user
    </h3>

    <div class="form-group col-sm-12 no-padding custom-margin">
        <label for="inputEmail" class="col-form-label">
            Full name</label>
        <div class="">
            <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control col-sm-12 dummy_vld"
                placeholder="Full name" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>
        </div>
        <div class="">
            <button type="button" id="emailPopover" class="btn btn-default btn-popover" data-container="body" data-trigger="focus"
                data-toggle="popover" data-placement="bottom" data-content="">
            </button>
        </div>
    </div>
    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label">
            Mobile number</label>
        <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Mobile number" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>

    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label">
            Email address</label>
        <asp:TextBox ID="TextBox1" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Email address" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>
    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label ">
            Password</label>
        <asp:TextBox ID="TextBox6" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Password" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>
    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label">
            Confirm password</label>
        <asp:TextBox ID="TextBox7" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Confirm password" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>
    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label">
            Date of birth</label>
        <asp:TextBox ID="TextBox2" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Date of birth" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>


    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label">
            Gender</label>
        <asp:TextBox ID="TextBox3" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Gender" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>


    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label">
            NID</label>
        <asp:TextBox ID="TextBox4" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="NID" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>

    <div class="form-group col-sm-12 no-padding ">
        <!-- has-error -->
        <label for="inputPassword" class="col-form-label">
            Zip code</label>
        <asp:TextBox ID="TextBox5" runat="server" TextMode="Password" title="Password"
            CssClass="form-control col-sm-12 dummy_vldPass" placeholder="Zip code" onkeyup="HideEmailPopover();" onkeypress="HideEmailPopover();" OnClientClick="HideEmailPopover();" onfocus="HideEmailPopover();"></asp:TextBox>

        <button type="button" id="passwordPopover" class="btn btn-default btn-popover" data-container="body"
            data-toggle="popover" data-placement="bottom" data-content="Enter your password.">
        </button>
    </div>




    <div class="form-group col-sm-12 no-padding">
        <asp:Button ID="btnBack" runat="server" CssClass="btn btn-primary pull-left" Text="Back"
            OnClientClick="return LoginFormValidation();" />

<<<<<<< HEAD
         <asp:Button ID="btnSaveUser" runat="server" CssClass="btn btn-success pull-right" Text="Save"
=======
         <asp:Button ID="btnSaveUser" runat="server" CssClass="btn btn-primary pull-right" Text="Back"
>>>>>>> 57496149d7c2a7b34e72096f8c573333f190d85f
            OnClientClick="return LoginFormValidation();" />

    </div>
    <div id="MainContent_divMessage" runat="server" class="bg-danger dng error-box" style="display: none;">
        <span class="col-xs-12">Incorrect fields.</span><span class="col-xs-12">Please try again.</span>
    </div>

</asp:Content>
